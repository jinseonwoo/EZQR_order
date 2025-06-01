// src/jolp/CartPage.js
import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    setLoading(false);
  }, []);

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const handlePlaceOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = [...existingOrders, cartItems];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    localStorage.removeItem('cart');
    setCartItems([]);
    setOrderComplete(true);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  if (loading) return <div className="p-4">장바구니를 불러오는 중...</div>;

  if (orderComplete) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg font-semibold mb-4">주문이 완료되었습니다</h2>
        <button
          onClick={() => setOrderComplete(false)}
          className="bg-blue-200 px-6 py-2 rounded text-sm text-white font-medium"
        >
          확인
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <div className="p-4 text-center text-gray-500">장바구니가 비어 있습니다.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">🛒 장바구니</h1>
      <div className="space-y-4">
        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center border-b pb-3 gap-3 text-sm"
          >
            <img
              src={item.image}
              alt={item.menu}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <div className="font-semibold">{item.menu}</div>
              <div className="text-gray-600">
                {item.options && Object.values(item.options).join(', ')}
              </div>
              <div className="text-gray-800">수량: {item.quantity}</div>
            </div>
            <div className="font-bold whitespace-nowrap">
              {(item.price * item.quantity).toLocaleString()}원
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-lg font-bold">총 금액: {total.toLocaleString()}원</div>
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          장바구니 초기화
        </button>
      </div>

      {/* ✅ 주문하기 버튼 위치 */}
      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full py-3 bg-blue-500 text-white rounded-lg text-sm font-semibold"
      >
        주문하기
      </button>
    </div>
  );
};

export default CartPage;
