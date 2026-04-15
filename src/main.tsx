import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 起動時のエラーをキャッチしてアラート表示（デバッグ用）
window.addEventListener('error', (event) => {
  alert(`JS Error: ${event.message}\nAt: ${event.filename}:${event.lineno}`);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
