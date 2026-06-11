import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const origFetch = window.fetch.bind(window);
window.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input.url;
  if (url.includes('/api/') || url.includes('api/v1/')) {
    return new Response(JSON.stringify({ success: true, data: [] }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  }
  return origFetch(input, init);
};

createRoot(document.getElementById("root")!).render(<App />);
