// src/jolp/ReceiptPage.js
import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';
import { useNavigate } from 'react-router-dom';

const ReceiptPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const navigate = useNavigate();
  const userId = 1;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE}/orders/user/${userId}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error("❌ JSON 아님: " + text.slice(0, 200));
        }

        const json = await response.json();
        console.log("🔍 백엔드 응답:", json);

        const orderList = Array.isArray(json) ? json : [];
        setOrders(orderList.reverse());
      } catch (err) {
        console.error('주문 내역 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const visibleOrders = orders.slice(0, visibleCount);

  return (
    <div className="bg-[#f6f7f9] min-h-screen pb-28">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-lg font-bold mb-6 text-center">주문내역</h1>
        {loading ? (
          <div className="text-center text-gray-500">불러오는 중...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">주문 내역이 없습니다.</div>
        ) : (
          <>
            {visibleOrders.map((order, index) => (
              <div key={index} className="mb-6">
                {order.items && order.items.length > 0 && (
                  <div className="border rounded-lg p-4 shadow-sm bg-white">
                    <div className="text-sm text-gray-500 mb-2">
                      주문일자: {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="mb-3">
                        <div className="text-base font-medium">{item.menuName}</div>
                        <div className="text-sm text-gray-600">
                          {item.price?.toLocaleString()}원
                        </div>
                        {idx !== order.items.length - 1 && (
                          <hr className="my-2 border-gray-200" />
                        )}
                      </div>
                    ))}
                    <div className="mt-4 text-right font-bold text-sm">
                      총 금액: {order.totalPrice?.toLocaleString()}원
                    </div>
                  </div>
                )}
              </div>
            ))}
            {visibleCount < orders.length && (
              <div className="text-center mt-4">
                <button
                  onClick={handleLoadMore}
                  className="text-blue-500 font-medium text-sm underline"
                >
                  내역 더보기 ▼
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ✅ 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-3 text-[12px] text-gray-600">
        <button onClick={() => navigate('/cart')} className="flex flex-col items-center">
          <img
            src="/cart ikon.png"
            alt="장바구니"
            className="mb-1 object-contain"
            style={{ width: '30px', height: '27px' }}
          />
          장바구니
        </button>
        <button onClick={() => navigate('/')} className="flex flex-col items-center">
          <img
            src="/home_1.png"
            alt="홈"
            className="mb-1 object-contain"
            style={{ width: '20px', height: '27px' }}
          />
          홈
        </button>
        <button onClick={() => navigate('/receipt')} className="flex flex-col items-center text-blue-500 font-bold">
          <img
            src="/receipt ikon_1_32.png"
            alt="주문내역"
            className="mb-1 object-contain"
            style={{ width: '30px', height: '27px' }}
          />
          주문내역
        </button>
        <button onClick={() => navigate('/mypage')} className="flex flex-col items-center">
          <img
            src="/mypage ikon.png"
            alt="마이페이지"
            className="mb-1 object-contain"
            style={{ width: '30px', height: '27px' }}
          />
          마이페이지
        </button>
      </nav>
    </div>
  );
};

export default ReceiptPage;
