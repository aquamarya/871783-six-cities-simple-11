import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import ErrorMessage from "./components/error-message/error-message";

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ToastContainer />
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>,
);
