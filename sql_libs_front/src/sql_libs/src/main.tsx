import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';

import { App } from './pages/App';
import { UseSearchConditionsSample } from './pages/UseSearchConditionsSample';

import './i18n/configs';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/useSearchConditions"
            element={<UseSearchConditionsSample />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
