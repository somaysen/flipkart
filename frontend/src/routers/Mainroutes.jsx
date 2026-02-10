import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../auth/register'
import Login from '../auth/login'
import Forgot from '../auth/Forgot'
import EmailChange from '../auth/EmailChange'
import Forgotpas from '../auth/Forgotpas'
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
import AddToCard from '../pages/AddToCard'



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

          <Route path="/forgot" element={<Forgotpas />} />

          {/* Allow reset page even if user is logged in */}
          <Route path="/reset-password/:token" element={<Forgot />} />

          <Route path="/change-email" element={
            <AuthRoute>
              <EmailChange />
            </AuthRoute>
            } />

          <Route path="/logout" element={ 
            <AuthRoute>
              <Logout />
            </AuthRoute>
            } />

            <Route path='/user/add-to-card' element={
              <AuthRoute>
                <AddToCard/>
              </AuthRoute>
            } />

            <Route path='/user/changed/email' element={
              <AuthRoute>
                <EmailChange/>
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
        <Route path='/product/:id' element={
          <AuthRoute>
            <ProdectDetails/>
          </AuthRoute>
        } />
    </Routes>
  )
}

export default Router
