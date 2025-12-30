import { StoryFn, Meta } from '@storybook/react';
import { CompletionDialog as MuiDialog } from '../../components';

export default {
  title: 'Mp/CompletionDialog',
  component: MuiDialog,
} as Meta<typeof MuiDialog>;

const Template: StoryFn<typeof MuiDialog> = function Template(args) {
  return <MuiDialog {...args} />;
};

export const Dialog = Template.bind({});
Dialog.args = {
  open: true,
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  onClose: () => console.log('close'),
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  onCloseButtonClick: () => console.log('cancel'),
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  onTransitionExited: () => console.log('transition exited'),
  message: '現場情報の登録が完了しました',
};
