import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/register'
import Login from '../pages/login'
import Forgot from '../pages/Forgot'
import Logout from '../pages/Logout'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}

export default Router