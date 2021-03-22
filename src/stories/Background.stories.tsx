import { Story, Meta } from '@storybook/react/types-6-0';
import { Background, BackgroundProps } from '../components/Background';

export default {
  title: 'Components/Background',
  component: Background,
} as Meta;

const Template: Story<BackgroundProps> = (args) => <Background {...args} />,
  sharedArgs = { stars: 100, inverted: false },
  sharedArgTypes = { stars: { control: { type: 'range', min: 10, max: 1000 } } };

export const Default = Template.bind({});
Default.args = Object.assign({}, sharedArgs);
Default.argTypes = Object.assign({}, sharedArgTypes);

export const Inverted = Template.bind({});
Inverted.args = Object.assign({ inverted: true }, sharedArgs);
Inverted.argTypes = Object.assign({}, sharedArgTypes);
