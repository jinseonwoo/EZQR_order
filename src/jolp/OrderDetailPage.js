// src/jolp/OrderDetailPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';

export const menuDetails = {
  tteokbokki: {
    name: '떡볶이',
    price: 4500,
    description: '쫄깃한 밀떡에 달콤매콤한 양념!',
    image: '/ddeokbokki.png',
    options: {
      메뉴 : ['떡 많이', '보통', '오뎅 많이'],
      맛 : ['순한맛', '중간맛', '매운맛'],
    },
  },
  soondae: {
    name: '순대',
    price: 4900,
    description: '500g 푸짐한 순대!',
    image: '/soondae.png',
    options: {
      size: ['순대만', '순대+간'],
    },
  },
  set1: { name: '1인 세트', price: 8900, description: '떡+튀김+순대', image: '/setmenu.png', options: {} },
  sotteok: { name: '소떡소떡', price: 2900, description: '소세지와 떡', image: '/sotteok.png', options: {} },
  gimmari: { name: '김말이', price: 2900, description: '바삭한 김말이', image: '/gimmari.png', options: {} },
  cheesestick: { name: '치즈 스틱', price: 2000, description: '치즈 스틱 2개', image: '/cheesestic.png', options: {} },
  cola500: { name: '콜라500', price: 2000, description: '콜라 500ml', image: '/cola500.png', options: {} },
  cola1250: { name: '콜라1250', price: 3000, description: '콜라 1.25L', image: '/cola1.25.png', options: {} },
  cider500: { name: '사이다500', price: 2000, description: '사이다 500ml', image: '/cider500.png', options: {} },
  cider1250: { name: '사이다1250', price: 3000, description: '사이다 1.25L', image: '/cider1.25.png', options: {} },
};

export const menuIdMap = {
  tteokbokki: 1,
  soondae: 2,
  set1: 3,
  sotteok: 4,
  gimmari: 5,
  cheesestick: 6,
  cola500: 7,
  cola1250: 8,
  cider500: 9,
  cider1250: 10,
};

// 🔥 menuId로 상세 정보를 찾기 위한 역매핑
export const menuDetailsById = Object.entries(menuIdMap).reduce((acc, [slug, id]) => {
  acc[id] = menuDetails[slug];
  return acc;
}, {});

const optionIdMap = {
  '떡 많이': 1,
  '보통': 2,
  '오뎅 많이': 3,
  '순한맛': 4,
  '중간맛': 5,
  '매운맛': 6,
  '순대만': 7,
  '순대+간': 8,
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const menu = menuDetails[id];

  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleOptionChange = (category, value) => {
    setSelectedOptions(prev => ({ ...prev, [category]: value }));
  };

  const increment = () => setQuantity(q => Math.min(q + 1, 99));
  const decrement = () => setQuantity(q => Math.max(q - 1, 1));

  const handleAddToCart = async () => {
    const userId = 1;
    const menuId = menuIdMap[id];

    for (let category in menu.options) {
      if (menu.options[category]?.length > 0 && !selectedOptions[category]) {
        alert(`"${category}" 옵션을 선택해주세요.`);
        return;
      }
    }

    const selectedOptionNames = Object.values(selectedOptions);
    const optionIds = selectedOptionNames.map(name => optionIdMap[name]).filter(Boolean);

    const newItem = {
      userId,
      menuId,
      optionIds, // 배열로 전송
      quantity,
    };

    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(newItem),
      });

      const resultText = await res.text();
      if (!res.ok) {
        alert("장바구니 추가 실패: " + resultText);
        return;
      }

      alert("✅ 장바구니에 담았습니다!");
      navigate('/order')
    } catch (err) {
      console.error("💥 요청 오류:", err);
      alert("서버 연결 실패");
    }
  };

  if (!menu) {
    return (
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="text-blue-500">← 뒤로가기</button>
        <h1 className="text-xl font-bold mt-4">해당 메뉴를 찾을 수 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">← 뒤로가기</button>
      <img src={menu.image} alt={menu.name} className="w-full h-52 object-cover rounded-xl mb-4" />
      <h1 className="text-xl font-bold mb-1">{menu.name}</h1>
      <p className="text-gray-600 mb-4">{menu.description}</p>

      {Object.entries(menu.options).map(([key, values]) => (
        <div className="mb-4" key={key}>
          <h2 className="text-sm font-semibold mb-2">{key} 선택</h2>
          {values.map((opt) => (
            <label key={opt} className="flex items-center text-sm mb-1">
              <input
                type="radio"
                name={key}
                value={opt}
                checked={selectedOptions[key] === opt}
                onChange={() => handleOptionChange(key, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2">수량</h2>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-fit">
          <button onClick={decrement} className="px-3 py-1 bg-gray-200 rounded text-lg">-</button>
          <span className="text-base font-medium w-8 text-center">{quantity}</span>
          <button onClick={increment} className="px-3 py-1 bg-gray-200 rounded text-lg">+</button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full py-3 bg-blue-500 text-white rounded-lg mt-6"
      >
        장바구니에 담기
      </button>
    </div>
  );
};

export default OrderDetailPage;
