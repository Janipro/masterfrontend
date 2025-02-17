import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';
import Playground from './pages/Playground.tsx';
import Tasks from './pages/Tasks.tsx';
import Class from './pages/Class.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/class" element={<Class />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
