import React from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/userContext';
import App from './App';
import createTheme from './styles/theme';
import { GlobalStyle } from './styles/global.styled';

const theme = createTheme();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <CookiesProvider>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </CookiesProvider>
);
