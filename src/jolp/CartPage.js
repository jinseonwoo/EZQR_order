// src/jolp/CartPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../api';
import { menuDetails, menuIdMap } from './OrderDetailPage';



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

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = 1;

  const getMenuInfo = (menuId) => {
    const key = Object.keys(menuIdMap).find(k => menuIdMap[k] === menuId);
    if (!key) {
      console.warn('❌ menuId 매핑 실패:', menuId);
      return { name: '알 수 없음', image: '/default.png' };
    }
    return menuDetails[key];
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/cart/${userId}`, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });
      const json = await res.json();
      setCartItems(json.data || []);
    } catch (err) {
      console.error('🧨 장바구니 불러오기 실패:', err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.price || 0);
  }, 0);

  const handlePlaceOrder = async () => {
    // 🧾 items 구조 맞춰 생성
    const items = cartItems.map((item) => {
    let optionId = null;
    if (Array.isArray(item.optionName) && item.optionName.length > 0) {
      optionId = optionIdMap[item.optionName[0]] || null;
    }

      return {
        menuId: item.menuId,
        optionId,
        quantity: item.quantity,
      };
    });

    const payload = {
      userId,
      storeId: 1,
      tableNumber: '1',
      items,
    };

    console.log("📦 주문 요청 payload:", payload);

    try {
      const res = await fetch(`${API_BASE}/orders/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      console.log("📨 응답 상태 코드:", res.status);
      console.log("📨 응답 본문:", text);

      if (!res.ok) throw new Error('❌ 주문 실패: ' + text);

      alert("✅ 주문이 완료되었습니다");
      navigate('/');
    } catch (err) {
      console.error("🧨 주문 실패:", err);
      alert("주문에 실패했습니다.");
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/cart/${userId}`, {
        method: 'DELETE',
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error('❌ 초기화 실패: ' + text);
      }

      setCartItems([]);
      alert('🧹 장바구니가 초기화되었습니다');
    } catch (err) {
      console.error('🧨 장바구니 초기화 오류:', err);
      alert("초기화 실패");
    }
  };
  

  if (loading) return <div className="p-4">장바구니를 불러오는 중...</div>;

  if (cartItems.length === 0) {
    return <div className="p-4 text-center text-gray-500">장바구니가 비어 있습니다.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">🛒 장바구니</h1>
      <div className="space-y-4">
        {cartItems.map((item, idx) => {
          const menuInfo = getMenuInfo(item.menuId);
          return (
            <div key={idx} className="flex items-center border-b pb-3 gap-3 text-sm">
              <img
                src={menuInfo.image}
                alt={menuInfo.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold">{menuInfo.name}</div>
                {item.optionName && (
                  <div className="text-gray-600">
                    {Array.isArray(item.optionName)
                      ? item.optionName.join(', ')
                      : item.optionName}
                  </div>
                )}
                <div className="text-gray-800">수량: {item.quantity}</div>
              </div>
              <div className="font-bold whitespace-nowrap">
                {(item.price).toLocaleString()}원
              </div>
            </div>
          );
        })}
      </div>
      

      <div className="mt-6 flex justify-between items-center">
        <div className="text-lg font-bold">총 금액: {total.toLocaleString()}원</div>
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
        >
          초기화
        </button>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full py-3 bg-blue-500 text-white rounded-lg text-sm font-semibold"
      >
        주문하기
      </button>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-3 text-[12px] text-gray-600">
        <button onClick={() => navigate('/cart')} className="flex flex-col items-center text-blue-500 font-bold">
          <img src="/cart ikon_1_32.png" alt="장바구니" className="mb-1 object-contain" style={{ width: '30px', height: '27px' }} />
          장바구니
        </button>
        <button onClick={() => navigate('/')} className="flex flex-col items-center">
          <img src="/home_1.png" alt="홈" className="mb-1 object-contain" style={{ width: '25px', height: '27px' }} />
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

export default CartPage;
