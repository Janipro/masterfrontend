import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Playground from './pages/Playground.tsx';
import Tasks from './pages/Tasks.tsx';
import Class from './pages/Class.tsx';
import Statistics from './pages/Statistics.tsx';
import Register from './pages/Register.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/class" element={<Class />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
