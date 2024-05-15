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

  const route = isAuthenticated
    ? [
        { path: '/', element: <ProductListPage /> },
        { path: '/product/upload', element: <UploadProductPage /> },
        { path: '/product/upload/:id', element: <UploadProductPage /> },
        { path: '/product/detail/:id', element: <ProductDetailsPage /> },
        { path: '*', element: <PageNotFoud /> },
      ]
    : [
        { path: '/', element: <ProductListPage /> },
        { path: '/product/detail/:id', element: <ProductDetailsPage /> },
        // { path: '/register', element: <RegisterPage /> },
        { path: '*', element: <PageNotFoud /> },
      ];

  return (
    <>
      <Modal />
      <Loading />
      <NavBar />
      <div className='container mx-auto p-8'>
        <Routes>
          {route.map((item, index) => (
            <Route path={item?.path} element={item?.element} key={index} />
          ))}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
