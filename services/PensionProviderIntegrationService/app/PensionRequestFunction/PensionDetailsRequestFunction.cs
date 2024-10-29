using Azure.Messaging.ServiceBus;
using MhpdCommon.Models.Configuration;
using MhpdCommon.Models.MessageBodyModels;
using MhpdCommon.Utils;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PensionRequestFunction.Constants;
using PensionRequestFunction.Orchestration;
using PensionRequestFunction.Transformer;
using System.Text;

namespace PensionRequestFunction
{
    public class PensionDetailsRequestFunction
    {
        private readonly ILogger<PensionDetailsRequestFunction> _logger;
        private readonly IIdValidator _idValidator;
        private readonly IMessageParser _messageParser;
        private readonly IMessagingService _messagingService;
        private readonly IViewDataOrchestrator _viewDataOrchestrator;
        private readonly IVewDataToPensionArrangementTransformer _transformer;
        private readonly CommonServiceBusConfiguration _serviceBusConfiguration;

        public PensionDetailsRequestFunction(ILogger<PensionDetailsRequestFunction> logger, 
            IIdValidator validator,
            IMessageParser messageParser,
            IMessagingService messagingService,
            IViewDataOrchestrator orchestrator,
            IVewDataToPensionArrangementTransformer transformer,
            IOptions<CommonServiceBusConfiguration> options)
        {
            _logger = logger;
            _idValidator = validator;
            _messageParser = messageParser;
            _messagingService = messagingService;
            _serviceBusConfiguration = options.Value;
            _viewDataOrchestrator = orchestrator;
            _transformer = transformer;
        }

        [Function(nameof(PensionDetailsRequestFunction))]
        public async Task Run(
            [ServiceBusTrigger("%InboundQueue%", Connection = "ServiceBusConnectionstring")]
            ServiceBusReceivedMessage message,
            ServiceBusMessageActions messageActions)
        {
            LogRequestMessage(message);
            string logMessage;
            if (!_idValidator.IsValidGuid(message.CorrelationId))
            {
                logMessage = string.Format(StatusConstants.InvalidCorrelationId, message.CorrelationId);
                _logger.LogCritical(logMessage);
                await messageActions.DeadLetterMessageAsync(message, deadLetterReason: logMessage);
                return;
            }

            const string payloadResponse = StatusConstants.PayloadInvalid;
            var messageBody = Encoding.UTF8.GetString(message.Body);
            PensionRequestPayload? payload;

            try
            {
                payload = _messageParser.ToPensionRequestPayload(messageBody);
            }
            catch (AggregateException error)
            {
                var builder = new StringBuilder(payloadResponse);
                builder.AppendLine();
                foreach (var ex in error.InnerExceptions)
                {
                    builder.AppendLine(ex.Message);
                }

                logMessage = builder.ToString();
                _logger.LogError(error, "{logMessage}", logMessage);
                await messageActions.DeadLetterMessageAsync(message, deadLetterReason: logMessage);
                return;
            }

            if (payload == null)
            {
                _logger.LogCritical(payloadResponse);
                await messageActions.DeadLetterMessageAsync(message, deadLetterReason: payloadResponse);
                return;
            }

            string? viewDataClaim;
            try
            {
                viewDataClaim = await _viewDataOrchestrator.GetPensionViewDataAsync(payload.Pei!, payload.Iss!, payload.UserSessionId!, message.CorrelationId);
            }
            catch(Exception error)
            {
                await messageActions.DeadLetterMessageAsync(message, deadLetterReason: error.Message);
                _logger.LogError(error, StatusConstants.ViewDataNotFoundForPei, payload.Pei, message.CorrelationId);
                return;
            }

            if (viewDataClaim == null)
            {
                await messageActions.DeadLetterMessageAsync(message, 
                    deadLetterReason: string.Format(StatusConstants.ViewDataNotFound, payload.Pei, message.CorrelationId));
                return;
            }

            _idValidator.TryExtractPei(payload.Pei, out _, out string externalAssetId);

            var pensionArrangements = _transformer.Transform(externalAssetId, viewDataClaim, payload.Pei!, payload.PensionRetrievalRecordId!);

            await SendRetrievedPensionDetailsMessageAsync(pensionArrangements, message.CorrelationId);

            await messageActions.CompleteMessageAsync(message);
        }      

        public async Task SendRetrievedPensionDetailsMessageAsync(string messageBody, string correlationId)
        {
            var logMessage = $"Message sent with CorrelationId:{correlationId}." +
            $"{Environment.NewLine}Message Body: : {messageBody}";

            _logger.LogInformation("Sending message to {queue}", _serviceBusConfiguration.OutboundQueue);
            _logger.LogInformation(logMessage);

            await _messagingService.SendMessageAsync(messageBody, _serviceBusConfiguration.OutboundQueue!, correlationId);
        }

        private void LogRequestMessage(ServiceBusReceivedMessage receivedMessage)
        {
            var logMessage = $"Message Received - CorrelationId:[{receivedMessage.CorrelationId}], " +
            $"MessageId: [{receivedMessage.MessageId}], ContentType: [{receivedMessage.ContentType}]";
            _logger.LogInformation("{Message}", logMessage);
            _logger.LogInformation("Message Body: {body}", receivedMessage.Body);
        }
    }
}