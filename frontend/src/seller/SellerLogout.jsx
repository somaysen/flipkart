import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosInstance'
import { logoutSeller } from '../store/reducers/sellerSlice'

function SellerLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/seller/logout');
    } catch {}
    try { localStorage.removeItem('sellerToken'); } catch {}
    dispatch(logoutSeller());
    navigate('/seller/login');
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  )
}

export default SellerLogout