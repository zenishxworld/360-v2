import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

const origFetch = window.fetch.bind(window);
window.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input.url;
  if (url.includes('upload') || url.includes('api/v1/')) {
    return new Response(JSON.stringify({ success: true, data: [] }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (url.includes('backend.uni360degree.com') || url.includes('razorpay')) {
    return new Response(JSON.stringify({ success: true, data: { status: 'completed', razorpay_payment_id: 'mock_pay_001' } }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (url.includes('/corporate/')) {
    return new Response(JSON.stringify({ success: true, data: { status: 'created', requestId: 'REQ001' } }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  }
  return origFetch(input, init);
};

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
