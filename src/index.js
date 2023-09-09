import ReactDOM from 'react-dom/client';

import QueryProvider from './react-query/queryProvider';

import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QueryProvider>
    <App />
  </QueryProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

reportWebVitals();
