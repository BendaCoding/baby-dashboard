import React from 'react';
import { Flex } from 'rebass';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './layout';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
