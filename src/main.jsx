import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ContextProvider from './context/Context.jsx';

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root using createRoot from react-dom/client
const root = createRoot(container);

// Render the application
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
