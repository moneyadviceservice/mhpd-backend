import { StoryFn } from '@storybook/react';
import { SummarySpendBreakdown, Props } from './SummarySpendBreakdown';
import data from './summarySpendData.json';

const StoryProps = {
  title: 'Components/TOOLS/SummarySpendBreakdown',
  component: SummarySpendBreakdown,
};

const Template: StoryFn<Props> = (args) => <SummarySpendBreakdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: data,
};

const budgetBuilderData = [
  {
    name: 'Family & Friends',
    value: 100,
    hasTick: true,
    percentage: 10,
    colour: '#879a24',
    url: '/cost-tab',
  },
  {
    name: 'Travel',
    value: 100,
    isEstimate: true,
    percentage: 2.5,
    colour: '#000d3d',
    url: '/cost-tab',
  },
];

export const BudgetBuilder = Template.bind({});
BudgetBuilder.args = {
  data: budgetBuilderData,
};

export default StoryProps;
