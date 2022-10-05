import React from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./context/userContext";
import CategoryProvider from "./context/categoryContext";
import App from "./App";
import { GlobalStyle } from "./styles/global.styled";

const container = document.getElementById("root");
const root = createRoot(container!);

// Create a client
const queryClient = new QueryClient();

root.render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <UserProvider>
        <CategoryProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CategoryProvider>
      </UserProvider>
    </QueryClientProvider>
  </CookiesProvider>
);
