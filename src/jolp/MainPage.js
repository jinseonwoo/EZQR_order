// src/jolp/MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const order = {
    number: 89,
    waitingTeams: 3,
    items: [
      { name: '야채 김밥', qty: 1, discount: 0, price: 5000 },
      { name: '떡볶이', qty: 1, discount: 0, price: 7500 },
    ]
  };

  const total = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="bg-[#f6f7f9] min-h-screen pb-36">
      <div className="bg-blue-200 py-3 text-center font-bold text-xl text-black">
      <span className="text-black">EZ</span><span className="text-white">QR</span>
    </div>
      <div className="max-w-md mx-auto p-4 text-[14px] text-gray-800">

        {/* 주문 상태 부분 */}
        <div className="bg-white p-6 rounded-[20px] shadow-md mb-4 text-center">
          <div className="text-[64px] font-black leading-none">{order.number}</div>
          <div className="mt-4 space-y-2 text-[14px]">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>주문 접수</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>조리중</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <div className="w-3 h-3 rounded-full border border-gray-400"></div>
              <span>조리완료</span>
            </div>
          </div>
        </div>

        {/* 대기 테이블 */}
        <div className="bg-white p-5 rounded-[20px] shadow-md mb-4 flex justify-center items-center text-[15px] font-medium">
          <span className="text-xl mr-2">⏳</span>
          현재 대기 테이블 <span className="text-blue-600 font-bold ml-1">{order.waitingTeams}팀</span>
        </div>

        {/* 주문 내역 */}
        <div className="bg-white p-5 rounded-[20px] shadow-md mb-4">
          <table className="w-full text-[13px] text-center">
            <thead className="border-b border-gray-300 text-gray-600">
              <tr>
                <th className="py-2">주문 내역</th>
                <th className="py-2">수량</th>
                <th className="py-2">할인</th>
                <th className="py-2">금액</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-2">{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.discount}</td>
                  <td>{item.price.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right font-semibold text-[15px] mt-3">
            총 결제금액: <span className="font-bold text-[16px]">{total.toLocaleString()}원</span>
          </div>
          <div className="text-right mt-1">
            <button className="text-blue-500 text-[13px]">...더보기</button>
          </div>
        </div>

        {/* 주문 방식 버튼 */}
        <div className="grid grid-cols-2 gap-4 mb-20">
          <button className="bg-white border border-gray-200 rounded-xl shadow py-3 font-semibold">
            방문포장
          </button>
          <button 
          onClick={() => navigate('/order')}
          className="bg-white border border-gray-200 rounded-xl shadow py-3 font-semibold">
            홀주문
          </button>
        </div>
      </div>

      {/* 하단 고정 네비게이션 */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-3 text-[12px] text-gray-600">
        <button onClick={() => navigate('/cart')}className="flex flex-col items-center">
          <div className="text-xl">🛒</div>
          장바구니
        </button>
        <button  className="flex flex-col items-center text-blue-500 font-bold">
          <div className="text-xl">🏠</div>
          홈
        </button>
        <button className="flex flex-col items-center">
          <div className="text-xl">📦</div>
          주문내역
        </button>
        <button onClick={() => navigate('/mypage')} className="flex flex-col items-center">
          <span className="text-lg">👤</span>
          마이페이지
        </button>
      </nav>
    </div>
  );
};

export default MainPage;
