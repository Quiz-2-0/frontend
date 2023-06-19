import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './app/App';
import { BrowserRouter } from 'react-router-dom';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

rootNode.render(
  <React.StrictMode>

    <BrowserRouter>


      <App />
    </BrowserRouter>

  </React.StrictMode>,

);
