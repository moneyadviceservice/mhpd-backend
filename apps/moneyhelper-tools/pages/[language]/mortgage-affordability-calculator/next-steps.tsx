import { Fragment } from 'react';
import { MortgageAffordability, getServerSidePropsDefault } from '.';
import { ParsedUrlQuery } from 'querystring';
import { convertQueryToUrlSearchParams } from 'utils/convertQueryToUrlSearchParams';
import { BackLink } from 'components/BackLink';
import { nextStepsContent } from 'data/mortgage-affordability/next-steps';
import {
  ExpenseFieldKeys,
  IncomeFieldKeys,
  OtherFieldKeys,
} from 'data/mortgage-affordability/step';
import { getRiskLevel } from 'utils/MortgageAffordabilityCalculator/getRiskLevel';
import { ResultFieldKeys } from 'data/mortgage-affordability/results';
import { TeaserCardParent } from 'components/TeaserCardParent';
import { MACAnalytics } from 'components/Analytics';
import { Paragraph } from '@maps-react/common/components/Paragraph';
import { ListElement } from '@maps-react/common/components/ListElement';
import { H1, H2 } from '@maps-react/common/components/Heading';
import { Container } from '@maps-react/core/components/Container';
import { useTranslation } from '@maps-react/hooks/useTranslation';

type Props = {
  isEmbed: boolean;
  lang: string;
  urlPath: string;
  query: ParsedUrlQuery;
  formData: Record<string, string>;
  resultData: Record<ResultFieldKeys, string>;
};

const NextSteps = ({
  isEmbed,
  lang,
  urlPath,
  query,
  formData,
  resultData,
}: Props) => {
  const { z } = useTranslation();
  const searchParams = convertQueryToUrlSearchParams(query).toString();
  const toolBaseUrl = `/${lang}${urlPath}`;
  const {
    heading,
    headingOptions,
    affordingYourMortgage,
    findOutMore,
    otherToolsToTry,
  } = nextStepsContent(z);

  const incomeFields = [IncomeFieldKeys.TAKE_HOME];
  if (formData[OtherFieldKeys.SECOND_APPLICANT] === 'yes') {
    incomeFields.push(IncomeFieldKeys.SEC_TAKE_HOME);
  }

  const expenseFields = [
    ExpenseFieldKeys.CARD_AND_LOAN,
    ExpenseFieldKeys.CARE_SCHOOL,
    ExpenseFieldKeys.CHILD_SPOUSAL,
    ExpenseFieldKeys.TRAVEL,
    ExpenseFieldKeys.BILLS_INSURANCE,
  ];

  const riskLevel = getRiskLevel(
    resultData,
    expenseFields,
    incomeFields,
    formData,
  );

  const getRiskHeadingOptions = () => {
    switch (riskLevel) {
      case 'success': {
        return [
          headingOptions.makeSureBestMortgage,
          headingOptions.dontMakeTheseMistakes,
          headingOptions.getStarted,
        ];
      }
      case 'warning': {
        return [
          headingOptions.exploreDifferentSchemes,
          headingOptions.takeControl,
          headingOptions.understandAllCosts,
        ];
      }
      case 'error': {
        return [
          headingOptions.thinkAboutBorrowLess,
          headingOptions.exploreDifferentSchemes,
          headingOptions.takeControl,
        ];
      }
    }
  };

  const listHeadingOptions = () => {
    const riskHeadingOptions = getRiskHeadingOptions();
    return riskHeadingOptions.map(({ heading, text }) => (
      <Fragment key={`${text}`}>
        <Paragraph className="font-bold">{heading}</Paragraph>
        {text}
      </Fragment>
    ));
  };

  const findOutMoreLinks = [
    findOutMore.costsOfBuying,
    findOutMore.budgetPlanner,
    findOutMore.improveCredit,
    findOutMore.affordableSchemes,
    findOutMore.savingDeposit,
    findOutMore.mortgageComparison,
  ];

  const step = 4;

  return (
    <MortgageAffordability isEmbed={isEmbed} step={step}>
      <MACAnalytics currentStep={step} formData={formData}>
        <Container>
          <div className="-mt-4">
            <BackLink href={`${toolBaseUrl}results?${searchParams}`}>
              {z({ en: 'Back', cy: 'Yn ôl' })}
            </BackLink>
          </div>
          <div className="lg:max-w-[840px] space-y-8 border-b-1 border-slate-400 py-8">
            <H1 className="md:text-[48px]">{heading[riskLevel]}</H1>
            <div className="pb-8">
              <ListElement
                items={listHeadingOptions()}
                variant="ordered"
                className="ml-8 space-y-4"
                color="blue"
              />
            </div>
          </div>
          <div className="lg:max-w-[840px] space-y-8 border-b-1 border-slate-400 py-8">
            <H2 className="md:text-[38px] text-blue-800">
              {affordingYourMortgage.heading}
            </H2>
            <Paragraph>{affordingYourMortgage.thinkAboutText}</Paragraph>
            <Paragraph>{affordingYourMortgage.spendMoreThanText}</Paragraph>
            {affordingYourMortgage.readMoreLink}
            <H2 className="my-8 md:text-[32px]">{findOutMore.heading}</H2>
            <ListElement
              items={findOutMoreLinks}
              variant="unordered"
              className="ml-8 space-y-4 pb-8"
              color="blue"
            />
          </div>
          <div className="lg:max-w-[840px] space-y-8 py-8">
            <TeaserCardParent
              heading={otherToolsToTry.heading}
              items={[
                otherToolsToTry.teaserCard.mortgageRepayment,
                otherToolsToTry.teaserCard.stampDuty,
              ]}
              target={otherToolsToTry.target}
              headingClasses={'my-0 text-blue-800'}
            />
          </div>
        </Container>
      </MACAnalytics>
    </MortgageAffordability>
  );
};

export default NextSteps;

export const getServerSideProps = getServerSidePropsDefault;
