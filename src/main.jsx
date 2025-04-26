/* eslint-disable no-unused-vars */
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import store from './app/store'; // Make sure this path is correct
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider >
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
