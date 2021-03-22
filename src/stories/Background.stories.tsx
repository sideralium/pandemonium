import { Story, Meta } from '@storybook/react/types-6-0';
import { Background, BackgroundProps } from '../components/Background';

export default {
  title: 'Components/Background',
  component: Background,
} as Meta;

const Template: Story<BackgroundProps> = (args) => <Background {...args} />;
const sharedArgs = {
  stars: { control: { type: 'range', min: 10, max: 1000 } },
};

export const Default = Template.bind({});

Default.args = {
  stars: 100,
  inverted: false,
};

Default.argTypes = Object.assign({}, sharedArgs);

export const Inverted = Template.bind({});

Inverted.args = {
  stars: 100,
  inverted: true,
};

Inverted.argTypes = Object.assign({}, sharedArgs);
