// src/jolp/OrderPage.js
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const menuData = {
  추천: [
    { name: '떡볶이', price: '4,500원', image: '/ddeokbokki.png' },
    { name: '순대', price: '500g : 4,900원', image: '/soondae.png' },
    { name: '1인 세트', price: '8,900원', image: '/setmenu.png' },
  ],
  사이드: [
    { name: '소떡소떡', price: '1개 : 2,900원', image: '/sotteok.png' },
    { name: '김말이', price: '3개 : 2,900원', image: '/gimmari.png' },
    { name: '치즈 스틱', price: '2개 : 2,000원', image: '/cheesestic.png' },
  ],
  음료: [
    { name: '콜라 500ml', price: '500ml : 2,000원', image: '/cola500.png' },
    { name: '콜라 1.25L', price: '1.25L : 3,000원', image: '/cola1.25.png' },
    { name: '사이다 500ml', price: '500ml : 2,000원', image: '/cider500.png' },
    { name: '사이다 1.25L', price: '1.25L : 3,000원', image: '/cider1.25.png'}
  ],
  세트: [
    { name: '1인 세트', price: '8,900원', image: '/setmenu.png' },
  ],
};

const slugMap = {
  '떡볶이': 'tteokbokki',
  '순대': 'soondae',
  '1인 세트': 'set1',
  '김말이': 'gimmari',
  '소떡소떡': 'sotteok',
  '치즈 스틱': 'cheesestick',
  '콜라 500ml': 'cola500',
  '콜라 1.25L' : 'cola1250',
  '사이다 500ml': 'cider500',
  '사이다 1.25L': 'cider1250'
};


const OrderPage = () => {
  const navigate = useNavigate();

  // 각 섹션의 ref 정의
  const sectionRefs = {
    추천: useRef(null),
    사이드: useRef(null),
    음료: useRef(null),
    세트: useRef(null),
  };

  const scrollToSection = (key) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="bg-white min-h-screen pb-10">
      {/* 상단 바 */}
      <div className="flex items-center px-4 py-3 shadow sticky top-0 bg-white z-10">
        <button onClick={() => navigate('/')} className="text-2xl mr-3">←</button>
        <h1 className="text-lg font-bold">EZ 분식집</h1>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex space-x-2 px-4 py-2 overflow-x-auto text-sm font-medium sticky top-[52px] bg-white z-10">
        {Object.keys(menuData).map((tab) => (
          <button
            key={tab}
            onClick={() => scrollToSection(tab)}
            className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-blue-200 whitespace-nowrap"
          >
            {tab} 메뉴
          </button>
        ))}
      </div>

      {/* 메뉴 리스트 */}
      <div className="px-4 py-2 space-y-6 text-sm">
        {Object.entries(menuData).map(([category, items]) => (
          <div key={category} ref={sectionRefs[category]}>
            <h2 className="text-base font-semibold mb-2 mt-4">{category} 메뉴</h2>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 cursor-pointer"
                onClick={() => navigate(`/menu/${slugMap[item.name]}`)}
                >
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-500">{item.price}</div>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                    
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
