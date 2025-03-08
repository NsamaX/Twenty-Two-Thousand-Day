import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const changeFavicon = () => {
  let index = 1;
  const totalIcons = 6;

  setInterval(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = `/icon/hourglass_${index}.ico`;
      index = index < totalIcons ? index + 1 : 1;
    }
  }, 1000);
};

changeFavicon();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
