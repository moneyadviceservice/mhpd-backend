using MhpdCommon.Models.MessageBodyModels;
using MhpdCommon.Utils;
using Microsoft.Extensions.Logging;

namespace MhpdCommon.TokenValidation;

public class CodeVerifierNotBase64String(ILogger<CodeVerifierNotBase64String> logger) : ITokenRequestValidator<CdaTokenRequestModel>
{
    public int Order => 9;
    public string GrantType => string.Empty;
    
    public ValidationResult Validate(CdaTokenRequestModel request)
    {
        if (request.CodeVerifier != null && !TokenUtility.IsValidCodeVerifier(request.CodeVerifier))
        {
            logger.LogError(TokenValidationMessages.InvalidCodeVerifierFormat);
            return ValidationResult.Failure(TokenValidationMessages.InvalidCodeVerifier);
        }

        return ValidationResult.Success();
    }
}