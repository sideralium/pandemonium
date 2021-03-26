import { Story, Meta } from '@storybook/react/types-6-0';
import { Background, BackgroundPropsI } from '../components/BasicBackground';

export default {
  title: 'Components/Background',
  component: Background,
} as Meta;

const Template: Story<BackgroundPropsI> = (args) => <Background {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.argTypes = {};
