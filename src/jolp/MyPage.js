// src/jolp/MyPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 상단 헤더 */}
      <div className="bg-blue-100 py-4 px-4 shadow">
        <button onClick={() => navigate(-1)} className="text-xl mr-3">←</button>
        <span className="text-lg font-semibold">마이 페이지</span>
      </div>

      {/* 메뉴 목록 */}
      <div className="p-4 space-y-4">
        <button className="w-full text-left border-b pb-2 text-sm flex items-center gap-2">
          <span>👤</span>
          회원정보 수정
        </button>
        <button className="w-full text-left border-b pb-2 text-sm flex items-center gap-2">
          <span>👜</span>
          과거 주문내역
        </button>
        <button className="w-full text-left border-b pb-2 text-sm flex items-center gap-2">
          <span>📝</span>
          리뷰 내역
        </button>
        <button className="w-full text-left border-b pb-2 text-sm flex items-center gap-2">
          <span>🚪</span>
          로그아웃
        </button>
      </div>

      <div className="text-center text-xs text-gray-400 mt-8">회원 탈퇴</div>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-sm flex justify-around py-2 text-xs">
        <button onClick={() => navigate('/cart')} className="flex flex-col items-center">
          <span className="text-lg">🛒</span>
          장바구니
        </button>
        <button onClick={() => navigate('/')} className="flex flex-col items-center">
          <span className="text-lg">🏠</span>
          홈
        </button>
        <button onClick={() => navigate('/orders')} className="flex flex-col items-center">
          <span className="text-lg">📦</span>
          주문내역
        </button>
        <button className="flex flex-col items-center text-blue-500 font-semibold">
          <span className="text-lg">👤</span>
          마이페이지
        </button>
      </nav>
    </div>
  );
};

export default MyPage;
