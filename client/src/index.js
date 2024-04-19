import "materialize-css/dist/css/materialize.min.css"

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import reportWebVitals from './reportWebVitals';

import { thunk } from 'redux-thunk';


// Provider
// It knows how to read changes in store and tell React
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// Reducers
import reducers from './reducers';

// dummy test of mail
import axios from "axios";
window.axios = axios;

// Redux store
const store = createStore(reducers, {}, applyMiddleware(thunk));

// root
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// Uncomment to see the given key and environment
// console.log(process.env.REACT_APP_STRIPE_KEY);
// console.log(process.env.NODE_ENV);

reportWebVitals();
