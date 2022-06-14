import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AsyncFinalForm from "./finalform/AsyncFinalForm/AsyncFinalForm";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/app" element={<App />} />
    <Route path="/" element={<AsyncFinalForm />} />
  </Routes>
</BrowserRouter>
);

