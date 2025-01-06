import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserWardrobe from './components/UserWardrobe';
import SeasonalWardrobe from './components/SeasonalWardrobe';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:userId" element={<UserWardrobe />} />
            <Route path="/user/:userId/:season" element={<SeasonalWardrobe />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;