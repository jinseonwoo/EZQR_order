// src/jolp/MainPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';

const userId = 1;

const MainPage = () => {
  const navigate = useNavigate();
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderStep, setOrderStep] = useState(null);
  const [waitingTeams, setWaitingTeams] = useState(0); // 🔹 대기 팀 수 상태
  const [waitingNumber, setWaitingNumber] = useState(null); // 🔹 대기 번호 상태

  const mapBackendStatusToStep = (status) => {
    status = 'ACCEPTED';
    switch (status) {
      case 'ACCEPTED':
        return '접수';
      case 'COOKING':
        return '조리중';
      case 'COMPLETED':
        return '완료';
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/user/${userId}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });

        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error('❌ JSON 아님: ' + text.slice(0, 200));
        }

        const json = await res.json();
        const orderList = Array.isArray(json) ? json.reverse() : [];
        setOrders(orderList);
      } catch (err) {
        console.error('🧨 주문내역 로딩 실패:', err);
      }
    };

    const fetchOrderStatus = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/user/${userId}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });

        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error('❌ JSON 아님: ' + text.slice(0, 200));
        }

        const json = await res.json();
        const step = mapBackendStatusToStep(json.status);
        setOrderStep(step);
      } catch (err) {
        console.error('🧨 주문 상태 불러오기 실패:', err);
      }
    };

    const fetchWaitingCount = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/waiting/count`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });

        const json = await res.json();
        setWaitingTeams(json.data); // 🔹 대기 팀 수 상태 설정
      } catch (err) {
        console.error('🧨 대기 팀 수 불러오기 실패:', err);
        setWaitingTeams(0);
      }
    };

    const fetchWaitingNumber = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/my-waiting-rank/1`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });

        const json = await res.json();
        setWaitingNumber(json.waitingRank); // 🔹 서버 응답 예시: { data: 89 }
      } catch (err) {
        console.error('🧨 대기번호 불러오기 실패:', err);
        setWaitingNumber(null);
      }
    };

    fetchOrders();
    fetchOrderStatus();
    fetchWaitingCount();
    fetchWaitingNumber();
  }, []);

  return (
    <div className="bg-[#f6f7f9] min-h-screen pb-36">
      <div className="bg-blue-200 py-3 text-center font-bold text-xl text-black">
        <span className="text-black">EZ</span><span className="text-white">QR</span>
      </div>

      <div className="max-w-md mx-auto p-4 text-[14px] text-gray-800">
        {/* 주문 상태 */}
        <div className="bg-white p-6 rounded-[20px] shadow-md mb-4 text-center">
          <div className="text-[64px] font-black leading-none">
            {waitingNumber !== null ? waitingNumber : '00'}
          </div>
          <div className="mt-4 space-y-2 text-[14px]">
            {['접수', '조리중', '완료'].map((step) => (
              <div key={step} className="flex items-center justify-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    orderStep === step ? 'bg-blue-500' : 'border border-gray-300'
                  }`}
                ></div>
                <span className={`${orderStep === step ? 'text-black' : 'text-gray-400'}`}>
                  주문 {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 대기 테이블 수 */}
        <div className="bg-white p-5 rounded-[20px] shadow-md mb-4 flex justify-center items-center text-[15px] font-medium">
          <span className="text-xl mr-2">⏳</span>
          현재 대기 테이블 <span className="text-blue-600 font-bold ml-1">{waitingTeams}팀</span>
        </div>

        {/* 주문 내역 */}
        <div className="bg-white p-5 rounded-[20px] shadow-md mb-4">
          <h2 className="text-lg font-semibold mb-2">주문 내역</h2>

          {orders.length === 0 || !orders[0].items ? (
            <p className="text-gray-400 text-sm">주문 내역이 없습니다.</p>
          ) : (
            <>
              {(showAllOrders ? orders[0].items : orders[0].items.slice(0, 2)).map((item, i) => (
                <div key={i} className="flex justify-between text-sm mb-1">
                  <span>{item.menuName}</span>
                  <span>{item.quantity}개</span>
                  <span>{(item.price || 0).toLocaleString()}원</span>
                </div>
              ))}

              <div className="text-right text-sm font-bold mt-2">
                총합: {orders[0].totalPrice?.toLocaleString()}원
              </div>

              {orders[0].items.length > 2 && (
                <div className="text-right mt-2">
                  <button
                    className="text-blue-500 text-sm"
                    onClick={() => setShowAllOrders(!showAllOrders)}
                  >
                    {showAllOrders ? '접기 ▲' : '...더보기 ▼'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* 주문 방식 선택 */}
        <div className="grid grid-cols-2 gap-4 mb-20">
          <button className="bg-white border border-gray-200 rounded-xl shadow py-3 font-semibold">
            방문포장
          </button>
          <button
            onClick={() => navigate('/order')}
            className="bg-white border border-gray-200 rounded-xl shadow py-3 font-semibold"
          >
            홀주문
          </button>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-3 text-[12px] text-gray-600">
        <button onClick={() => navigate('/cart')} className="flex flex-col items-center">
          <img src="/cart ikon.png" alt="장바구니" className="mb-1 object-contain" style={{ width: '30px', height: '27px' }} />
          장바구니
        </button>
        <button className="flex flex-col items-center text-blue-500 font-bold">
          <img src="/home ikon.png" alt="홈" className="mb-1 object-contain" style={{ width: '30px', height: '27px' }} />
          홈
        </button>
        <button onClick={() => navigate('/receipt')} className="flex flex-col items-center">
          <img src="/receipt ikon.png" alt="주문내역" className="mb-1 object-contain" style={{ width: '30px', height: '27px' }} />
          주문내역
        </button>
        <button onClick={() => navigate('/mypage')} className="flex flex-col items-center">
          <img src="/mypage ikon.png" alt="마이페이지" className="mb-1 object-contain" style={{ width: '30px', height: '27px' }} />
          마이페이지
        </button>
      </nav>
    </div>
  );
};

export default MainPage;
