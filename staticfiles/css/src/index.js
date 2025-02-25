import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { Toaster } from 'react-hot-toast';
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <HelmetProvider > 
    <App />
    </HelmetProvider>
    </Router>
    <Toaster />
  </React.StrictMode>
);
