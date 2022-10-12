import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { MessageChain } from './pages/MessageChain';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/message/:id" element={<MessageChain />} />
      </Routes>
    </div>
  );
}

export default App;
