import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../auth/register'
import Login from '../auth/login'
import Forgot from '../auth/Forgot'
import Logout from '../auth/Logout'
import SellerLogin from '../seller/SellerLogin'
import SellerRegister from '../seller/SellerRegister'
import SellerProducts from '../seller/SellerProdect'
import UnAuthRoute from './Unauth'
import AuthRoute from './Auth'
import SellerAuthRoute from './SellerAuth'
import CreateProduct from '../products/createProdect'
import UpdateProduct from '../products/UpdateProduct'
import ProdectDetails from '../products/prodectDetails'

function Router() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

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

          <Route path="/logout" element={ 
            <AuthRoute>
              <Logout />
            </AuthRoute>
            } />
          
        <Route path='/seller/login' element={<SellerLogin/>} />
        <Route path='/seller/register' element={<SellerRegister/>} />
        <Route path='/seller/dashboard' element={
          <SellerAuthRoute>
            <SellerProducts/>
          </SellerAuthRoute>
          } />
        <Route path='/seller/prodects' element={
          <SellerAuthRoute>
            <SellerProducts/>
          </SellerAuthRoute>
          } />
        <Route path='/seller/products' element={
          <SellerAuthRoute>
            <SellerProducts/>
          </SellerAuthRoute>
          } />
        <Route path='/seller/add-product' element={
          <SellerAuthRoute>
            <CreateProduct/>
          </SellerAuthRoute>
          } />
        <Route path='/seller/products/:id/edit' element={
          <SellerAuthRoute>
            <UpdateProduct/>
          </SellerAuthRoute>
          } />
        <Route path='/product/:id' element={<ProdectDetails/>} />
    </Routes>
  )
}

export default Router