import { createBrowserRouter } from 'react-router-dom';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';
import { Providers } from '../components/Providers';
import '../styles/index.scss';
import { TopPage } from './TopPage';

export const routes = [
  {
    element: <Providers />,
    children: [
      {
        path: '',
        element: <TopPage />,
        screenId: 'P-01',
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export function App() {
  return <div>Kernel App</div>;
}
