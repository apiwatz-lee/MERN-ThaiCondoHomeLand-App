import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import UploadProductPage from './pages/UploadProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import PageNotFoud from './pages/PageNotFoud';
import { useAuth } from './context/Authentication';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Modal from './components/Modal/Modal';
import Loading from './components/Loading';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Modal />
      <Loading />
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
              <Route path='*' element={<PageNotFoud />} />
            </>
          ) : (
            <>
              <Route path='/' element={<ProductListPage />} />
              <Route
                path='/product/detail/:id'
                element={<ProductDetailsPage />}
              />
              <Route path='/register' element={<RegisterPage />} />
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
