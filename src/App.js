import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './layout';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
