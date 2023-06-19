import React from 'react';

import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

rootNode.render(
  <React.StrictMode>

    <BrowserRouter>

      <App />
    </BrowserRouter>

  </React.StrictMode>,

);
