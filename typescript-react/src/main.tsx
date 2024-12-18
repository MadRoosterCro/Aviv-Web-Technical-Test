import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

import 'sanitize.css';
import '@styles/global.scss';

const rootSelectorId = 'root';
const rootElement = document.getElementById(rootSelectorId);

if (rootElement === null) {
  throw new Error(`Could not find element with id ${rootSelectorId}`);
}

const queryClient = new QueryClient();

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
