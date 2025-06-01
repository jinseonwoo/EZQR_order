// src/jolp/ReceiptPage.js
import React, { useEffect, useState } from 'react';

const ReceiptPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const totalPrice = (order) => {
    return order.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  if (orders.length === 0) {
    return <div className="p-4 text-center text-gray-500">주문 내역이 없습니다.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-lg font-bold mb-4 text-center">주문내역</h1>
      {orders.map((order, index) => (
        <div key={index} className="border rounded-lg p-3 mb-4 shadow-sm">
          <div className="mb-2 bg-gray-50 p-2 rounded">
            {order.map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b py-1 text-sm">
                <div>
                  <div>{item.menu}</div>
                  <div className="text-gray-500">{item.price.toLocaleString()}원</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right font-bold text-sm">
            총 금액: {totalPrice(order).toLocaleString()}원
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceiptPage;
