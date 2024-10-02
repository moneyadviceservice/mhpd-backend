import { StoryFn } from '@storybook/react';
import { JsOnly, Props } from '.';

const StoryProps = {
  title: 'Components/TOOLS/JsOnly',
  component: JsOnly,
};

const Template: StoryFn<Props> = (args) => <JsOnly {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div>some children</div>,
  fallback: (
    <ul>
      <li>one</li> <li>two</li> <li>three</li>
    </ul>
  ),
};

export default StoryProps;
