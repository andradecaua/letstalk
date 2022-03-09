import React from 'react';
import ReactDOM from 'react-dom';

import { store } from './store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import { HomePage } from './pages/Home'
import { LoginPage } from './pages/Login'
import { CadastrarPage } from './pages/Cadastrar'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './styles/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={ <HomePage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/cadastrar" element={ <CadastrarPage/> } />

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
