import { Meta, StoryFn } from '@storybook/react';
import { PageDescription } from '../../components';

export default {
  title: 'Mp/PageDescription',
  component: PageDescription,
} as Meta<typeof PageDescription>;

const Template: StoryFn<typeof PageDescription> = function Template(args) {
  return <PageDescription {...args} />;
};

export const TitleOnly = Template.bind({});

TitleOnly.args = {
  title: 'グループMPユーザー一覧',
};

export const TitleWithButtons = Template.bind({});

TitleWithButtons.args = {
  title: 'グループMPユーザー一覧',
  buttons: [
    {
      text: 'MPユーザー追加',
      disabled: true,
    },
    {
      text: 'MPユーザー削除',
      disabled: true,
    },
    {
      text: 'Buildeeから取込み',
      disabled: false,
      onClick: () => {
        // eslint-disable-next-line no-console -- Storybook上での動作確認のため
        console.log('clicked');
      },
    },
  ],
};
