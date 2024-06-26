import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './views/home';
import Menu from './views/menu';
import NoPage from './views/noPage';
import Order from './views/order';
import Types from './views/types';
import Search from './views/search';

import './index.css';

import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Home />} />
          <Route path="order/:id?" element={<Order />} />
          <Route path="types" element={<Types />} />
          <Route path="search/:name" element={<Search />} />
          <Route path="build" element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);