import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';

import App from '@app';

import './config/cloudinary';
import './config/slate';

import './assets/styles/reset.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Helmet>
      <meta name="google-site-verification" content="LKdObr0tK_XMXBddJwBLhJKj1VUM9V71ajJ2hHJ6Jhw" />
    </Helmet>
    <App />
  </React.StrictMode>,
);
