import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import UploadProductPage from './pages/UploadProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductCartPage from './pages/ProductCartPage';
import PageNotFoud from './pages/PageNotFoud';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/Authentication';
import RegisterPage from './pages/RegisterPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Modal from './components/Modal/Modal';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Modal />
      <NavBar />
      <div className='container mx-auto p-8'>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path='/' element={<ProductListPage />} />
              <Route path='/product/upload/' element={<UploadProductPage />} />
              <Route
                path='/product/upload/:id'
                element={<UploadProductPage />}
              />
              <Route
                path='/product/detail/:id'
                element={<ProductDetailsPage />}
              />
              <Route path='/product/cart' element={<ProductCartPage />} />
              <Route
                path='/payment/checkout-success'
                element={<CheckoutSuccess />}
              />
              <Route path='*' element={<PageNotFoud />} />
            </>
          ) : (
            <>
              <Route path='/' element={<ProductListPage />} />
              <Route path='/product/cart' element={<ProductCartPage />} />
              <Route
                path='/product/detail/:id'
                element={<ProductDetailsPage />}
              />
              <Route path='/register' element={<RegisterPage />} />
              {/* <Route path='/login' element={<LoginPage />} /> */}
              <Route path='*' element={<PageNotFoud />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
