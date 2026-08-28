import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles.css';

function App() {
  return <main>Eventra</main>;
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
