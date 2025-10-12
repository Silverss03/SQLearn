import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { NotFound } from '../../components';
import { NotFoundException } from '../../errors';

export default {
  title: 'Mp/NotFound',
  component: NotFound,
  argTypes: {},
} as ComponentMeta<typeof NotFound>;

const Template: ComponentStory<typeof NotFound> = function Template() {
  const router = createMemoryRouter([
    {
      errorElement: (
        <HelmetProvider>
          <NotFound />
        </HelmetProvider>
      ),
      children: [
        {
          path: '/',
          Component: () => {
            throw new NotFoundException();
          },
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
