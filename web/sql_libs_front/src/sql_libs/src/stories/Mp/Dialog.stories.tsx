import { useState } from 'react';
import { Button } from '@mui/material';
import { StoryFn, Meta } from '@storybook/react';
import { Dialog as MuiDialog } from '../../components';

export default {
  title: 'Mp/Dialog',
  component: MuiDialog,
  argTypes: {},
} as Meta<typeof MuiDialog>;

const Template: StoryFn<typeof MuiDialog> = function Template(args) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <MuiDialog
        {...args}
        actions={[
          <Button
            color="primary"
            key="button-close"
            variant="outlined"
            size="small"
            sx={{ width: 160 }}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>,
          <Button
            color="primary"
            key="button-submit"
            variant="contained"
            size="small"
            sx={{ width: 160 }}
          >
            Submit
          </Button>,
        ]}
        onClose={() => setOpen(false)}
        // eslint-disable-next-line no-console -- For Storybook testing
        onTransitionExited={() => console.log('onTransitionExited')}
        open={open}
      />
    </>
  );
};

export const Dialog = Template.bind({});
Dialog.args = {
  content:
    'Content Content Content Content Content Content Content',
  divider: true,
  title: 'Dialog Title',
};

export const Alphanumeric = Template.bind({});
Alphanumeric.args = {
  content:
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  divider: true,
  title:
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
};
