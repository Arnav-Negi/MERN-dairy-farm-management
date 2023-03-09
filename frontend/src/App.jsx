import * as React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from './components/Auth/Auth';
import Verify from './components/Auth/Verify'
import Choose from './components/Choice/Choose';

export default function App() {

  return (
   <Routes>
      <Route path="/" element={<Choose />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/:type/:user_id/verify/:token" element={<Verify />} />
      <Route path="*" element={<Navigate to='/' />} />
   </Routes>
  )
}
