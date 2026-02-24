import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CaseRandomizer from './pages/tabs/CaseRandomizer';

function App({ onLogout }) {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard onLogout={onLogout} />}>
        <Route index element={<Navigate to="case-randomizer" replace />} />
        <Route path="case-randomizer" element={<CaseRandomizer />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
