import { render } from '@testing-library/react';
import { QuestionPage } from './QuestionPage';
import { DataPath } from 'types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
  }),
}));

jest.mock('hooks/useAnalytics', () => ({
  useAnalytics: jest.fn(() => ({
    addStepPage: jest.fn(),
  })),
}));

jest.mock('components/Questions', () => ({
  Questions: jest.fn(() => null),
}));

const mockLinks = {
  question: {
    backLink: '/back-link',
  },
  change: {
    backLink: '/back-link',
    nextLink: 'next-link',
  },
  summary: {
    backLink: '/back-link',
    nextLink: 'next-link',
  },
  result: {
    backLink: '/back-link',
    firstStep: '/first-step',
  },
};

describe('QuestionPage component', () => {
  it('renders Questions component with correct props', () => {
    const storedData = {};
    const data = '';
    const currentStep = 1;
    const isEmbed = false;
    const analyticsData = {
      pageName: 'Page Name',
      pageTitle: 'Page Title',
      toolName: 'Tool Name',
      stepNames: ['Step 1', 'Step 2', 'Step 3'],
    };

    render(
      <QuestionPage
        storedData={storedData}
        data={data}
        currentStep={currentStep}
        dataPath={DataPath.PensionType}
        links={mockLinks}
        isEmbed={isEmbed}
        analyticsData={analyticsData}
      />,
    );

    expect(
      jest.requireMock('components/Questions').Questions,
    ).toHaveBeenCalledTimes(1);
  });
});
