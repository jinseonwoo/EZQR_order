// src/jolp/CartPage.js
import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // 실제 로그인한 사용자 ID로 교체 필요

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`/cart/${userId}`);
        const result = await response.json();
        setCartItems(result.data || []); // DataResponseDTO 기준
      } catch (error) {
        console.error('장바구니 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <div className="p-4">장바구니를 불러오는 중...</div>;

  if (cartItems.length === 0) {
    return <div className="p-4 text-center text-gray-500">장바구니가 비어 있습니다.</div>;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">🛒 장바구니</h1>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center border-b pb-3">
            <img src={item.image} alt={item.menu} className="w-16 h-16 rounded mr-4 object-cover" />
            <div className="flex-1">
              <div className="font-semibold">{item.menu}</div>
              <div className="text-sm text-gray-600">
                {item.options && Object.values(item.options).join(', ')}
              </div>
              <div className="text-sm text-gray-800">수량: {item.quantity}</div>
            </div>
            <div className="font-bold whitespace-nowrap">
              {(item.price * item.quantity).toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right font-bold text-lg">
        총 금액: {total.toLocaleString()}원
      </div>
    </div>
  );
};

export default CartPage;
