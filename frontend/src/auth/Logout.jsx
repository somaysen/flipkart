import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/reducers/userSlice'
import { logoutUser } from '../store/actions/userActions'

function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        await dispatch(logoutUser()).unwrap();
      } catch (e) {
        // ignore error, still clear client-side state
      }

      // Clear client-side user state (server will clear httpOnly cookie)
      dispatch(logout())
      navigate('/login')
    })()
  }, [dispatch, navigate])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="p-6 bg-white/90 rounded shadow">
        <p className="text-gray-700">Signing out...</p>
      </div>
    </div>
  )
}

export default Logout
