// star-project/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StarsCanvas } from './StarBackground.jsx';

// Find the container element in the base.html file
const rootElement = document.getElementById('star-background-root');

if (rootElement) {
  // Mount the React component into the container
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <StarsCanvas />
    </React.StrictMode>,
  );
} else {
  console.error("Could not find the root element with ID 'star-background-root'. The star background will not render.");
}
