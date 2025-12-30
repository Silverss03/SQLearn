import { StoryFn, Meta } from '@storybook/react';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Error } from '../../components';

export default {
  title: 'Mp/Error',
  component: Error,
} as Meta<typeof Error>;

const Template: StoryFn<typeof Error> = function Template() {
  const router = createMemoryRouter([
    {
      errorElement: (
        <HelmetProvider>
          <Error />
        </HelmetProvider>
      ),
      children: [
        {
          path: '/',
          Component: () => {
            throw {
              name: 'error',
              message: 'error',
              config: {
                headers: {
                  Traceparent:
                    '00-abcb9242febead4e51cf8a795047068f-04ea52317214031c-01,00-e3d35ab2543320aaa07d5c0db2461933-421c8851b3d2deb3-01',
                },
              },
            } as Error;
          },
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export const Default = Template.bind({});
Default.args = {};
