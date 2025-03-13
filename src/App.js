import { Analytics } from '@vercel/analytics/react';
import './style.css';

function App() {
  return (
    <>
      <div className="layout">
        {/* ...existing code from index.html body... */}
      </div>
      <Analytics />
    </>
  );
}

export default App;
