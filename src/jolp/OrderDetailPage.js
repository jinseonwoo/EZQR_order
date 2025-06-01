// src/jolp/OrderDetailPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const menuDetails = {
  tteokbokki: {
    name: '떡볶이',
    price: 4500,
    description: '쫄깃한 밀떡에 달콤매콤한 양념!',
    image: '/ddeokbokki.png',
    options: {
      amount: ['떡 많이', '보통', '오뎅 많이'],
      spicy: ['순한맛', '중간맛', '매운맛']
    }
  },
  soondae: {
    name: '순대',
    price: 4900,
    description: '500g 푸짐한 순대!',
    image: '/soondae.png',
    options: {
      size: ['순대만', '순대+간']
    }
  },
  gimmari: {
    name: '김말이',
    price: 2900,
    description: '바삭하게 튀긴 김말이 3개!',
    image: '/gimmari.png',
    options: {}
  },
  set1: {
    name: '1인 세트',
    price: 8900,
    description: '떡볶이와 순대, 튀김이 한 번에!',
    image: '/setmenu.png',
    options: {}
  },
  sotteok: {
    name: '소떡소떡',
    price: 2900,
    description: '소세지+떡 조합 인기메뉴',
    image: '/sotteok.png',
    options: {}
  },
  cheesestick: {
    name: '치즈 스틱',
    price: 2000,
    description: '2개 구성된 치즈스틱',
    image: '/cheesestic.png',
    options: {}
  },
  cola500: {
    name: '콜라500',
    price: 2000,
    description: '시원한 콜라 500ml',
    image: '/cola500.png',
    options: {}
  },
  cola1250: {
    name: '콜라1250',
    price: 3000,
    description: '시원한 콜라 1.25l',
    image: '/cola1.25.png',
    options: {}
  },

  cider500: {
    name: '사이다500',
    price: 2000,
    description: '상쾌한 사이다 500ml',
    image: '/cider500.png',
    options: {}
  },

  cider1250: {
    name: '사이다1250',
    price: 3000,
    description: '상쾌한 사이다 1.25l',
    image: '/cider1.25.png',
    options: {}
  }
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

  const increment = () => {
    setQuantity(q => Math.min(q + 1, 99));
  };

  const decrement = () => {
    setQuantity(q => Math.max(q - 1, 1));
  };

const handleAddToCart = async () => {
     // 필수 옵션 누락 확인
    if (menu.options?.amount && !selectedOptions.amount) {
      alert('메뉴 선택을 완료해주세요.');
      return;
    }
    if (menu.options?.spicy && !selectedOptions.spicy) {
      alert('맛 선택을 완료해주세요.');
      return;
    }
    if (menu.options?.size && !selectedOptions.size) {
      alert('순대 선택을 완료해주세요.');
      return;
    }

     const newItem = {
      menu: menu.name,
      image: menu.image,
      quantity,
      options: selectedOptions,
      price: menu.price,
    };

    // 기존 장바구니 불러오기 (없으면 빈 배열)
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

  // 새 항목 추가
  existingCart.push(newItem);

  // 다시 localStorage에 저장
  localStorage.setItem('cart', JSON.stringify(existingCart));

  alert('장바구니에 담았습니다!');
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

      {menu.options?.amount && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-2">메뉴 선택</h2>
          {menu.options.amount.map((opt) => (
            <label key={opt} className="flex items-center text-sm mb-1">
              <input
                type="radio"
                name="amount"
                value={opt}
                checked={selectedOptions.amount === opt}
                onChange={() => handleOptionChange('amount', opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {menu.options?.spicy && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-2">맛 선택</h2>
          {menu.options.spicy.map((opt) => (
            <label key={opt} className="flex items-center text-sm mb-1">
              <input
                type="radio"
                name="spicy"
                value={opt}
                checked={selectedOptions.spicy === opt}
                onChange={() => handleOptionChange('spicy', opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {menu.options?.size && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-2">순대 선택</h2>
          {menu.options.size.map((opt) => (
            <label key={opt} className="flex items-center text-sm mb-1">
              <input
                type="radio"
                name="size"
                value={opt}
                checked={selectedOptions.size === opt}
                onChange={() => handleOptionChange('size', opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {/* 수량 선택 */}
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
      className="w-full py-3 bg-blue-500 text-white rounded-lg mt-6">
        장바구니에 담기
      </button>
    </div>
  );
};

export default OrderDetailPage;
