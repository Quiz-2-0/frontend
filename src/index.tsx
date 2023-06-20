import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { GlobalStyles, SFProDisplay } from './vendor';

const rootDiv = document.getElementById('root');
const rootNode = createRoot(rootDiv as Element);

rootNode.render(
  <React.StrictMode>

    <BrowserRouter>
      <GlobalStyles />
      <SFProDisplay />
      <App />
    </BrowserRouter>

  </React.StrictMode>,

);
