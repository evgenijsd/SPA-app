import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { MainPage } from './pages/MainPage';
import { MessageAdd } from './pages/MessageAdd';
import { MessageChain } from './pages/MessageChain';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/message/:id" element={<MessageChain />} />
        <Route path="/add/:id" element={<MessageAdd />} />        
      </Routes>
    </>
  );
}

export default App;


