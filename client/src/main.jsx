import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Toaster } from './components/ui/sonner';
import AppContextProvider from './context/AppContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
    <Toaster />
  </BrowserRouter>
);
