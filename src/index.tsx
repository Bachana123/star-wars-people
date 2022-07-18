import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux'
import store from './store/store'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import StarWarsPeople from "./pages/StarWarsPeople";
import StarWarsPerson from "./pages/StarWarsPerson";

import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<StarWarsPeople />} />
          <Route path="person/:personId" element={<StarWarsPerson />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
