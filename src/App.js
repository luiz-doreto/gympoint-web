import React from 'react';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';
import Routes from './routes';
import history from './services/history';
import GlobalStyle from './styles/global';

import { store, persistor } from './store';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                    <Routes />
                    <GlobalStyle />
                </Router>
            </PersistGate>
        </Provider>
    );
}
