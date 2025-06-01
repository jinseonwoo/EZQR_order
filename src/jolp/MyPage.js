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
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-3 text-[12px] text-gray-600">
        <button onClick={() => navigate('/cart')} className="flex flex-col items-center">
          <img src ="/cart ikon.png"
          alt="장바구니"
          classname="mb-1 object-contain"
          style={{width: '30px', height: '27px'}}/>
          장바구니
        </button>
        <button onClick={() => navigate('/')} className="flex flex-col items-center">
          <img src="/home ikon.png" 
          alt="홈" 
          classname="mb-1 object-contain"
          style={{width: '30px', height: '27px'}}/>
          홈
        </button>
        <button className="flex flex-col items-center">
          <img src = "/receipt ikon.png"
          classname="mb-1 object-contain"
          style={{width: '30px', height: '27px'}}/>
          주문내역
        </button>
        <button onClick={() => navigate('/orders')} className="flex flex-col items-center">
          <img src = "/mypage ikon.png"
          alt="마이페이지"
          classname="mb-1 object-contain"
          style={{width: '30px', height: '27px'}}/>
          마이페이지
        </button>
      </nav>
    </div>
  );
};


export default MyPage;
