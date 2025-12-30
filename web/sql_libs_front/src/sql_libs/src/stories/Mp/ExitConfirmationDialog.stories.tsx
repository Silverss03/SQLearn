import { StoryFn, Meta } from '@storybook/react';
import { ExitConfirmationDialog as MuiDialog } from '../../components';

export default {
  title: 'Mp/ExitConfirmationDialog',
  component: MuiDialog,
} as Meta<typeof MuiDialog>;

const Template: StoryFn<typeof MuiDialog> = function Template(args) {
  return <MuiDialog {...args} />;
};

export const Dialog = Template.bind({});
Dialog.args = {
  open: true,
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  onCancelButtonClick: () => console.log('cancel'),
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  onClose: () => console.log('close'),
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  onConfirmationButtonClick: () => console.log('confirm'),
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  onTransitionExited: () => console.log('transition exited'),
};
