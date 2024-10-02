import {
  Button,
  H2,
  Heading,
  Errors,
  Icon,
  IconType,
  Link,
} from '@maps-digital/shared/ui';
import { Container } from '@maps-react/core/components/Container';
import { ErrorSummary } from 'components/ErrorSummary/ErrorSummary';
import { MoneyInput } from 'components/MoneyInput';
import { useTranslation } from '@maps-react/hooks/useTranslation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { DataFromQuery } from 'utils/pageFilter';
import { twMerge } from 'tailwind-merge';
import {
  getDurationOptions,
  getInputs,
  getMonthOptions,
  getYearOptions,
} from 'data/form-content/questions/savings-calculator';
import { PercentInput } from 'components/PercentInput';
import { Select } from 'components/Select';
import { SavingsCalculatorResults } from './SavingsCalculatorResults';
import { getSixMonthsFromCurrentDate } from 'utils/SavingsCalculator/savingsCalculatorValidationInputs';
import { interestRateWarning } from 'utils/SavingsCalculator/savingsCalculatorResults';
import { AnalyticsData, useAnalytics } from 'hooks/useAnalytics';
import { useRouter } from 'next/router';
import { DataPath, FormContentAnlyticsData, Question } from 'types';
import { getText } from 'data/form-content/text/savings-calculator';

export enum SavingsCalculatorType {
  HOW_MUCH = 'how-much',
  HOW_LONG = 'how-long',
}

export type ErrorField = {
  field: string;
  type: string;
};
export type ErrorObject = {
  [key: string]: ErrorField;
};
interface PensionPotCalculatorProps {
  lang?: string;
  isEmbed: boolean;
  errors: ErrorField[];
  queryData: DataFromQuery;
  dataPath: DataPath;
  calculatorType: SavingsCalculatorType;
  analyticsData?: FormContentAnlyticsData;
}
export const SavingsCalculator = ({
  isEmbed,
  errors,
  queryData = {},
  lang,
  dataPath,
  calculatorType,
  analyticsData,
}: PensionPotCalculatorProps) => {
  const { z } = useTranslation();
  const { addEvent } = useAnalytics();
  const router = useRouter();
  const toolInit = useRef<boolean>(false);
  const toolStarted = useRef<boolean>(false);
  const toolCompleted = useRef<boolean>(false);

  const pageData = useMemo(() => {
    return {
      page: {
        pageName: analyticsData?.pageName,
        pageTitle: analyticsData?.pageTitle,
        lang: lang,
        categoryLevels: analyticsData?.categoryLevels,
        pageType: 'tool page',
      },
      tool: {
        toolName: analyticsData?.toolName,
        toolStep: '1',
        stepName: analyticsData?.stepNames as string,
      },
    };
  }, [analyticsData, lang]);

  const pageResults = useMemo(() => {
    return {
      ...pageData.page,
      pageName: `${pageData.page.pageName}--results`,
      tool: {
        ...pageData.tool,
        toolStep: '2',
        stepName: 'Your results',
      },
    };
  }, [pageData]);

  const fields = useMemo(
    () => getInputs(z, calculatorType),
    [z, calculatorType],
  );

  const { z: enTranslation } = useTranslation('en');

  const fieldsEn = useMemo(() => {
    return getInputs(enTranslation, calculatorType);
  }, [enTranslation, calculatorType]);

  const data = useMemo(() => getText(z, calculatorType), [z, calculatorType]);
  const refSubmit = useRef<HTMLInputElement>(null);
  const refError = useRef<HTMLInputElement>(null);

  const getErrors = useCallback(
    (
      errors: ErrorField[],
      fieldsOverride?: Question[],
    ): Record<string, string[]> => {
      const errorMap: Record<string, string[]> = {};

      errors.forEach((e) => {
        let field;
        if (fieldsOverride) {
          field = fieldsOverride.find((f) => f.type === e.field);
        } else {
          field = fields.find((f) => f.type === e.field);
        }

        const err =
          (field?.errors &&
            (field?.errors as Record<string, string>)[e.type]) ||
          null;

        if (field && err) {
          if (errorMap[e.field]) {
            errorMap[e.field].push('\n');
            errorMap[e.field].push(err);
          } else {
            errorMap[e.field] = [err];
          }
        }
      });

      return errorMap;
    },
    [fields],
  );

  const isQueryValid = useCallback(
    (queryData: DataFromQuery) => {
      const validQuery =
        queryData &&
        fields
          .filter((field) => field.type !== 'date')
          .map((field) => queryData[field.type])
          .every((v) => v !== undefined);

      return validQuery && Object.keys(getErrors(errors)).length === 0;
    },
    [fields, errors, getErrors],
  );

  const isValid = isQueryValid(queryData);

  const errorAnalytics = useCallback(() => {
    const err = getErrors(errors, fieldsEn);
    if (Object.keys(err).length) {
      toolCompleted.current = false;
      addEvent({
        event: 'errorMessage',
        eventInfo: {
          toolName: analyticsData?.toolName,
          toolStep: '1',
          stepName: analyticsData?.stepNames,
          errorDetails: Object.keys(err).map((key) => {
            const field = fieldsEn.find((f) => f.type === key);
            return {
              reactCompType: `${field?.group}`,
              reactCompName: `${field?.title}`,
              errorMessage: `${err[key]}`,
            };
          }),
        },
      } as AnalyticsData);
    }
  }, [addEvent, analyticsData, errors, fieldsEn, getErrors]);

  useEffect(() => {
    if (!toolInit.current) {
      if (isQueryValid(queryData)) {
        addEvent({
          page: {
            ...pageData.page,
            ...pageResults,
          },
          tool: pageResults.tool,
          event: 'pageLoadReact',
        });

        if (!toolCompleted.current) {
          addEvent({
            page: {
              ...pageData.page,
              ...pageResults,
            },
            tool: pageResults.tool,
            event: 'toolCompletion',
          });
        }

        toolStarted.current = true;
        toolCompleted.current = true;
      } else {
        addEvent({
          ...pageData,
          event: 'pageLoadReact',
        });
      }

      errorAnalytics();

      toolInit.current = true;
    }

    router.events.on('routeChangeComplete', errorAnalytics);

    return () => {
      router.events.off('routeChangeComplete', errorAnalytics);
    };
  }, [
    addEvent,
    isQueryValid,
    queryData,
    analyticsData,
    pageData,
    router,
    pageResults,
    errorAnalytics,
  ]);

  const analyticsTrack = () => {
    if (!toolStarted.current) {
      addEvent({
        ...pageData,
        event: 'toolStart',
      });
      toolStarted.current = true;
    }

    if (toolCompleted.current) {
      addEvent({
        page: {
          ...pageData.page,
          ...pageResults,
        },
        tool: pageResults.tool,
        event: 'toolRestart',
      });

      toolCompleted.current = false;
    }
  };

  return (
    <Container className="my-6">
      <div className="lg:max-w-[860px]">
        <div className="mb-6 lg:mb-8">
          <span className="text-2xl text-blue-800 font-bold block mb-6">
            {data.title}
          </span>
          <Link
            href={`/${lang}/${dataPath}`}
            className="inline-flex align-middle"
          >
            <Icon type={IconType.CHEVRON_LEFT}></Icon>
            {z({
              en: 'Back',
              cy: 'Yn ôl',
            })}
          </Link>
          <Heading className="mt-4 mb-6 md:mb-14 sm:leading-[54px]">
            {data.subTitle}
          </Heading>
          <ErrorSummary
            ref={refError}
            classNames={Object.keys(errors).length ? 'mb-6' : ''}
            title={data.errorTitle}
            errors={getErrors(errors)}
          />
          <div className="lg:flex lg:flex-row">
            <form
              onSubmit={() => {
                return false;
              }}
              className="basis-1/2"
              action={`/${lang}/${dataPath}/${calculatorType}#results`}
              noValidate
            >
              <input
                type="hidden"
                name="isEmbed"
                value={isEmbed ? 'true' : 'false'}
              />
              <Inputs
                fields={fields}
                queryData={queryData}
                errors={errors}
                isValid={isValid}
                onChange={() => analyticsTrack()}
              />
              <div className="flex">
                <Button
                  ref={refSubmit}
                  className="mb-14 mt-10 md:mt-12 md:mb-16"
                  variant="primary"
                >
                  {isValid ? data.reSubmitButton : data.submitButton}
                </Button>
                {isValid && (
                  <Link
                    href={`https://www.moneyhelper.org.uk/${lang}/everyday-money/budgeting/budget-planner`}
                    target="_blank"
                    asInlineText
                    asButtonVariant="secondary"
                    className="ml-6 mb-14 mt-10 md:mt-12 md:mb-16"
                  >
                    {z({
                      en: 'Start budgeting',
                      cy: 'Dechreuwch gyllidebu',
                    })}
                  </Link>
                )}
              </div>
            </form>
            {isValid && (
              <SavingsCalculatorResults
                queryData={queryData}
                calculatorType={calculatorType}
              />
            )}
          </div>
          {isValid && <ResultContent />}
        </div>
      </div>
    </Container>
  );
};

export const Inputs = ({
  fields,
  errors,
  queryData,
  isValid,
  onChange,
}: {
  fields: Question[];
  errors: ErrorField[];
  queryData: DataFromQuery;
  isValid: boolean;
  onChange?: () => void;
}) => {
  const { z } = useTranslation();
  const getErrorMessage = (field: Question, errors: ErrorField[]) => {
    return errors
      .filter((e) => e.field === field.type)
      .map((err) => (field?.errors as Record<string, string>)[err.type])
      .filter(Boolean);
  };

  const { month, year } = getSixMonthsFromCurrentDate();

  return (
    <>
      {fields?.map((field) => {
        const hasError = (field: Question) => {
          return getErrorMessage(field, errors).length > 0;
        };

        const groupInput = field.type === 'amount';

        return (
          <Errors
            errors={hasError(field) ? ['error'] : []}
            key={field.type}
            className={twMerge(hasError(field) ? 'pl-3' : '')}
          >
            <fieldset className="mb-6" role={groupInput ? 'group' : 'none'}>
              <label
                htmlFor={field.type}
                className={twMerge(
                  'text-2xl text-gray-800 inline-flex mb-2',
                  !!field.description && 'mb-0',
                )}
              >
                {field.title}
              </label>
              {hasError(field) && field?.errors && (
                <div
                  className="text-red-700 mb-2"
                  aria-describedby={`${field.type}`}
                >
                  {getErrorMessage(field, errors).map((e) => (
                    <span className="block" key={e.toString()}>
                      {e}
                    </span>
                  ))}
                </div>
              )}
              {field.type !== 'interest' && field.type === 'amount' && (
                <div className="md:flex md:flex-row">
                  <MoneyInput
                    aria-required={true}
                    id={`${field.type}`}
                    key={`${field.type}`}
                    name={`${field.type}`}
                    defaultValue={queryData[`${field.type}`]}
                    className={twMerge([
                      'border-gray-600 border-l-0 max-w-full md:max-w-max rounded-r',
                    ])}
                    onChange={() => {
                      onChange && onChange();
                    }}
                    isAllowed={({ floatValue }) => {
                      return (
                        (floatValue ?? 0) >= 0 && (floatValue ?? 0) <= 999999999
                      );
                    }}
                    value={queryData[field.type]}
                  />
                  <Select
                    id={`${field.type}Duration`}
                    name={`${field.type}Duration`}
                    aria-required={true}
                    hidePlaceholder={true}
                    onChange={() => {
                      onChange && onChange();
                    }}
                    aria-label={z({
                      en: 'Frequency',
                      cy: 'Amlder',
                    })}
                    defaultValue={queryData[`${field.type}Duration`] ?? '12'}
                    options={getDurationOptions(z)}
                    className="max-w-full md:max-w-max md:min-w-[195px] mt-6 md:ml-6 md:mt-0"
                    selectClassName="h-[49px]"
                  />
                </div>
              )}

              {field.type !== 'amount' && field.type === 'date' && (
                <div className="flex flex-col md:flex-row">
                  <div className="flex-col">
                    <label
                      htmlFor="durationMonth"
                      className="block text-2xl mb-2"
                    >
                      {z({
                        en: 'Month',
                        cy: 'Mis',
                      })}
                    </label>
                    <Select
                      aria-required={true}
                      id={'durationMonth'}
                      name={'durationMonth'}
                      aria-label={z({
                        en: 'Month',
                        cy: 'Mis',
                      })}
                      defaultValue={queryData['durationMonth'] ?? month}
                      hidePlaceholder={true}
                      onChange={() => {
                        onChange && onChange();
                      }}
                      options={getMonthOptions(z)}
                      className="max-w-full md:min-w-[200px]"
                      selectClassName="h-[49px]"
                    />
                  </div>
                  <div className="md:ml-6 max-w-full mt-4 md:mt-0">
                    <label
                      htmlFor="durationYear"
                      className="block text-2xl mb-2"
                    >
                      {z({
                        en: 'Year',
                        cy: 'Blwyddyn',
                      })}
                    </label>
                    <Select
                      aria-required={true}
                      id={'durationYear'}
                      name={'durationYear'}
                      hidePlaceholder={true}
                      defaultValue={queryData['durationYear'] ?? year}
                      options={getYearOptions()}
                      aria-label={z({
                        en: 'Year',
                        cy: 'Blwyddyn',
                      })}
                      onChange={() => {
                        onChange && onChange();
                      }}
                      className="max-w-full md:min-w-[200px]"
                      selectClassName="h-[49px]"
                    />
                  </div>
                </div>
              )}

              {field.type !== 'interest' &&
                field.type !== 'date' &&
                field.type !== 'amount' && (
                  <MoneyInput
                    data-testid={field.type}
                    aria-required={field.type === 'savingGoal' || undefined}
                    id={field.type}
                    key={field.type}
                    name={field.type}
                    onChange={() => {
                      onChange && onChange();
                    }}
                    className={twMerge([
                      'border-gray-600 border-l-0 max-w-full md:max-w-max rounded-r',
                    ])}
                    isAllowed={({ floatValue }) => {
                      return (
                        (floatValue ?? 0) >= 0 && (floatValue ?? 0) <= 999999999
                      );
                    }}
                    value={queryData[field.type]}
                  />
                )}

              {field.type === 'interest' && (
                <>
                  <PercentInput
                    decimalScale={undefined}
                    data-testid={field.type}
                    id={field.type}
                    key={field.type}
                    name={field.type}
                    onChange={() => {
                      onChange && onChange();
                    }}
                    className={twMerge([
                      'border-gray-600 border-r-0  max-w-full md:max-w-max rounded-l',
                    ])}
                    isAllowed={({ floatValue }) => {
                      return (
                        (floatValue ?? 0) >= 0 && (floatValue ?? 0) <= 999999999
                      );
                    }}
                    value={queryData[field.type]}
                  />
                  {isValid && (
                    <InterestRateWarning interestRate={queryData.interest} />
                  )}
                </>
              )}
            </fieldset>
          </Errors>
        );
      })}
    </>
  );
};

const InterestRateWarning = ({ interestRate }: { interestRate: string }) => {
  const { z } = useTranslation();
  const hasInterestRateWarning = interestRateWarning(Number(interestRate));
  return (
    <>
      {hasInterestRateWarning.annualInterestRateHigh && (
        <p className="mt-4">
          {z({
            en: (
              <>
                The interest rate you added looks higher than we
                {"'"}d expect, did you mean to enter{' '}
                <span className="font-bold">{interestRate}%</span>?{' '}
              </>
            ),
            cy: (
              <>
                Mae’r gyfradd llog rydych wedi’i hychwanegu’n edrych yn uwch nag
                y byddem yn ei disgwyl, a oeddech yn bwriadu nodi{' '}
                <span className="font-bold">{interestRate}%</span>?{' '}
              </>
            ),
          })}
        </p>
      )}
      {hasInterestRateWarning.annualInterestRateLow && (
        <p className="mt-4">
          {z({
            en: (
              <>
                The interest rate you added looks lower than you could be
                getting. Shop around for{' '}
                <Link
                  className="inline"
                  target="_blank"
                  asInlineText
                  href={
                    'https://www.moneyhelper.org.uk/en/savings/how-to-save/cash-savings-at-a-glance'
                  }
                >
                  the best savings account for you.
                </Link>
              </>
            ),
            cy: (
              <>
                Mae’r gyfradd llog rydych wedi’i hychwanegu’n edrych yn is nag y
                gallech ei chael. Chwiliwch am y{' '}
                <Link
                  target="_blank"
                  asInlineText
                  href={
                    'https://www.moneyhelper.org.uk/en/savings/how-to-save/cash-savings-at-a-glance'
                  }
                >
                  cyfrif cynilo gorau ar eich cyfer chi.
                </Link>
              </>
            ),
          })}
        </p>
      )}
    </>
  );
};

const ResultContent = () => {
  const { z } = useTranslation();
  return (
    <div className="lg:mt-8">
      <p className="text-sm mb-8">
        {z({
          en: (
            <>
              This tool gives you an{' '}
              <span className="font-bold">indication</span> of how long it will
              take to reach your goal, or how much you need to regularly save to
              have your savings by a specific date.{' '}
              <span className="font-bold">
                Results are an estimate and should only be used as such.
              </span>
            </>
          ),
          cy: (
            <>
              Mae’r offeryn hwn yn rhoi{' '}
              <span className="font-bold">arwydd</span> ichi o faint o amser y
              bydd yn ei gymryd i gyrraedd eich nod, neu faint fydd angen ichi
              gynilo’n rheolaidd i gael eich cynilion erbyn dyddiad penodol{' '}
              <span className="font-bold">
                Mae’r canlyniadau’n amcangyfrif a dylid eu defnyddio fel hynny’n
                unig.
              </span>
            </>
          ),
        })}
      </p>
      <H2 className="text-[38px] leading-[43px]">
        {z({
          en: 'Next steps',
          cy: 'Camau nesaf',
        })}
      </H2>
      <ul className="list-disc list-outside pl-6 mt-6">
        <li className="mb-2">
          {z({
            en: (
              <>
                Looking for ways to save up quicker?{' '}
                <Link
                  className="font-bold inline visited:text-pink-600"
                  target="_blank"
                  asInlineText
                  href={
                    'https://www.moneyhelper.org.uk/en/everyday-money/budgeting/budget-planner'
                  }
                >
                  Use our Budget planner
                </Link>{' '}
                to work out where you could cut your costs.
              </>
            ),
            cy: (
              <>
                Chwilio am ffyrdd o gynilo’n gynt? Defnyddiwch ein{' '}
                <Link
                  className="font-bold inline visited:text-pink-600"
                  target="_blank"
                  asInlineText
                  href={
                    'https://www.moneyhelper.org.uk/cy/everyday-money/budgeting/budget-planner'
                  }
                >
                  Cynllunydd cyllideb
                </Link>{' '}
                weld sut allech chi gwtogi’ch costau.
              </>
            ),
          })}
        </li>
        <li className="mb-2">
          {z({
            en: (
              <>
                It’s easy to cuts £100s off your spend, find out more in our{' '}
                <Link
                  className="font-bold inline visited:text-pink-600"
                  target="_blank"
                  asInlineText
                  href={
                    'https://www.moneyhelper.org.uk/en/everyday-money/budgeting/how-to-save-money-on-household-bills'
                  }
                >
                  How to save money on household bills
                </Link>{' '}
                guide.
              </>
            ),
            cy: (
              <>
                Mae’n hawdd cwtogi £100oedd oddi ar eich gwariant, dysgwch ragor
                yn ein canllaw{' '}
                <Link
                  className="font-bold inline visited:text-pink-600"
                  target="_blank"
                  asInlineText
                  href={
                    'https://www.moneyhelper.org.uk/cy/everyday-money/budgeting/how-to-save-money-on-household-bills'
                  }
                >
                  Sut i arbed arian ar filiau{"'"}r cartref.
                </Link>
              </>
            ),
          })}
        </li>
        <li>
          {z({
            en: (
              <>
                Have a read of our{' '}
                <Link
                  className="font-bold inline visited:text-pink-600"
                  target="_blank"
                  asInlineText
                  href={
                    'https://www.moneyhelper.org.uk/en/everyday-money/budgeting/beginners-guide-to-managing-your-money'
                  }
                >
                  Beginners guide to managing money
                </Link>{' '}
                to make sure you’re getting the basics right.
              </>
            ),
            cy: (
              <>
                Darllenwch ein{' '}
                <Link
                  className="font-bold inline visited:text-pink-600"
                  target="_blank"
                  asInlineText
                  href={
                    'https://www.moneyhelper.org.uk/cy/everyday-money/budgeting/beginners-guide-to-managing-your-money'
                  }
                >
                  Canllaw i ddechreuwyr ar reoli arian
                </Link>{' '}
                i wneud yn siŵr eich bod yn cael y pethau sylfaenol yn iawn.
              </>
            ),
          })}
        </li>
      </ul>
    </div>
  );
};
