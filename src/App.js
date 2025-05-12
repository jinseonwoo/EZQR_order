import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './jolp/MainPage';
import OrderPage from './jolp/OrderPage';
import OrderDetailPage from './jolp/OrderDetailPage';
import MyPage from './jolp/MyPage';
import CartPage from './jolp/CartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/order" element={<OrderPage />} />
         <Route path="/menu/:id" element={<OrderDetailPage />} />
         <Route path="/mypage" element={<MyPage />} />
         <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
   
  );
}

export default App;
