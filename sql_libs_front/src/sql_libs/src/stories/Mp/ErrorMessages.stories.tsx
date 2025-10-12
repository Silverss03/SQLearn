import { StoryFn, Meta } from '@storybook/react';
import { ErrorMessages } from '../../components';

export default {
  title: 'Mp/ErrorMessages',
  component: ErrorMessages,
} as Meta<typeof ErrorMessages>;

const Template: StoryFn<typeof ErrorMessages> = function Template(args) {
  return <ErrorMessages {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  error: true,
  messages: [
    '「検索ラベル名」を設定してください。',
    '「検索タグ」を1つ以上設定してください。',
  ],
};

export const LongMessage = Template.bind({});
LongMessage.args = {
  error: true,
  messages: [
    '「検索ラベル名ラベル名ラベル名ラベル名ラベル名ラベル名ラベル名ラベル名ラベル名ラベル名」を設定してください。',
  ],
};
