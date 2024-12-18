import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/Authentication.jsx';
import jwtInterceptor from './utils/jwtInterceptors.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { ModalProvider } from './context/ModalContext/state.jsx';

jwtInterceptor();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ModalProvider>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </ModalProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
