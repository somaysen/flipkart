import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/register'
import Login from '../pages/login'
import Forgot from '../pages/Forgot'
import Logout from '../pages/Logout'
import SellerLogin from '../seller/SellerLogin'
import SellerRegister from '../seller/SellerRegister'
import SellerProducts from '../seller/SellerProdect'
import UnAuthRoute from './Unauth'
import AuthRoute from './Auth'

function Router() {
  return (
    <Routes>

      <Route path="/" element={
        <UnAuthRoute>
          <Home />
        </UnAuthRoute>
        } />

          <Route path="/register" element={
            <UnAuthRoute>
              <Register />
            </UnAuthRoute>
            } />

          <Route path="/login" element={
            <UnAuthRoute>
              <Login />
            </UnAuthRoute>
              } />

          <Route path="/forgot" element={
            <UnAuthRoute>
              <Forgot />
            </UnAuthRoute>
            } />

          <Route path="/login" element={ 
            <AuthRoute>
              <Logout />
            </AuthRoute>
            } />
          
        <Route path='/seller/login' element={
          <AuthRoute>
            <SellerLogin/>
          </AuthRoute>
          } />
        <Route path='/seller/register' element={
          <AuthRoute>
            <SellerRegister/>
          </AuthRoute>
          } />
        <Route path='/seller/prodects' element={
          <AuthRoute>
            <SellerProducts/>
          </AuthRoute>
          } />
    </Routes>
  )
}

export default Router