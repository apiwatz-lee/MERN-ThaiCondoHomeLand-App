import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authentication';
import { jwtDecode } from 'jwt-decode';
import { FaBars as HamburgerIcon } from 'react-icons/fa';
import { CiShoppingTag as ShoppingIcon } from 'react-icons/ci';
import { IoCloudUploadOutline as UploadIcon } from 'react-icons/io5';
import logo from '../assets/img/logo.png';
import { useApp } from '../context/AppContext';
import NavBarDrawer from './NavBarDrawer';
import { useModal } from '../context/ModalContext/state';

export default function NavBar() {
  // state
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Hook
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, isAuthenticated } = useAuth();

  const { setKeyword } = useApp();
  const {
    loginModal: { setModalLogin },
  } = useModal();

  let anchor;
  let name;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setKeyword('');
    logout();
  };

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY !== 0) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(window.scrollY);
    }
  };

  if (isAuthenticated) {
    const getToken = localStorage.getItem('token');
    const decodeToken = jwtDecode(getToken);
    const role = decodeToken.role;
    name = decodeToken.firstname;
    if (role === 'admin') {
      anchor = [
        { id: 1, name: 'Assets list', path: '/', icon: <ShoppingIcon /> },
        {
          id: 2,
          name: 'Upload Assets',
          path: '/product/upload',
          icon: <UploadIcon />,
        },
      ];
    } else if (role === 'user') {
      anchor = [
        { id: 1, name: 'Assets list', path: '/', icon: <ShoppingIcon /> },
      ];
    }
  } else if (!isAuthenticated) {
    anchor = [
      { id: 1, name: 'Assets list', path: '/', icon: <ShoppingIcon /> },
    ];
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      {/* NavBarDrawer */}
      <NavBarDrawer
        toggleMenu={toggleMenu}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        anchor={anchor}
      />
      {/* Desktop */}
      {/* Nav Container */}
      <nav
        className={` flex justify-between items-center lg:text-base py-5 px-14 sm:px-28 mb-5 sticky top-0 z-30 bg-neutral-100 transition-transform duration-500 transform ${
          show ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Path */}
        <ul className='hidden lg:flex justify-center items-center gap-5 lg:p-3 h-16'>
          {anchor.length > 0 &&
            anchor?.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    // onClick={handleResetValue}
                    onClick={() => location.reload()}
                    to={item.path}
                    className={`text-[15px] sm:text-base text-center text-gray-500 hover:text-cyan-800 duration-500 ${
                      location?.pathname === item?.path
                        ? 'text-cyan-700 font-bold border-b-2 border-b-cyan-600 sm:font-semibold sm:p-2'
                        : null
                    }`}
                  >
                    {item?.name}
                  </Link>
                </li>
              );
            })}
        </ul>

        {/* Logo */}
        <div
          className='hidden lg:flex flex-col justify-center items-center gap-2 cursor-pointer'
          onClick={() => navigate('/')} //to fix state unclear value
        >
          <img src={logo} alt='logo' className='w-12' />
          <p className='tracking-widest font-medium hidden sm:block'>
            ThaiCondoHomeLand
          </p>
        </div>

        <ul className='relative flex justify-between items-center p-3 w-full lg:w-auto'>
          {/* Hamburgur Icon */}
          <div className='lg:hidden' onClick={toggleMenu}>
            <HamburgerIcon className='text-2xl text-cyan-900 hover:text-gray-500 duration-300 cursor-pointer' />
          </div>

          {/* Guest or Admin */}
          <li className='flex justify-center items-center gap-1 cursor-pointer'>
            <p>{isAuthenticated ? `Hello ${name}` : `Hello Guest`} |</p>

            {isAuthenticated ? (
              <p
                className='hidden lg:block cursor-pointer text-red-500 font-semibold hover:text-red-700 duration-500'
                onClick={() => handleLogout()}
              >
                Log out
              </p>
            ) : (
              <p
                className='hidden lg:block cursor-pointer font-semibold hover:text-cyan-600 text-cyan-600 duration-500'
                // onClick={() => navigate('/login')}
                onClick={() =>
                  setModalLogin((prev) => ({ ...prev, visible: true }))
                }
              >
                Log in
              </p>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
