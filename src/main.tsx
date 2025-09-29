import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TanStackQueryProvider } from './providers/TanStackQueryProvider';
import "@/lib/axios.interceptor";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <TanStackQueryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TanStackQueryProvider>
    </UserProvider>
  </React.StrictMode>
);
