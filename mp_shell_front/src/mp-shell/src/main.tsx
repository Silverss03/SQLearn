import React from 'react';
import ReactDOM from 'react-dom/client';
import { Init } from './components/Init';
import { App } from './pages/App';
import { OpenReLoginDialogProvider } from './services/store/OpenReLoginDialog';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <OpenReLoginDialogProvider>
      <Init>
        <App />
      </Init>
    </OpenReLoginDialogProvider>
  </React.StrictMode>
);
