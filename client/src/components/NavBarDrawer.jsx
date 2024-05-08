import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authentication';
import { jwtDecode } from 'jwt-decode';
import { FaBars as HamburgerIcon, FaTimes as CancelIcon } from 'react-icons/fa';
import { CiShoppingTag as ShoppingIcon } from 'react-icons/ci';
import { IoCloudUploadOutline as UploadIcon } from 'react-icons/io5';
import { CiLogout as LogoutIcon, CiLogin as LoginIcon } from 'react-icons/ci';
import { useApp } from '../context/AppContext';

const NavBarDrawer = ({ toggleMenu, isOpen, setIsOpen }) => {
  const { setKeyword } = useApp();
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [anchor, setAnchor] = useState([]);

  const handleLogout = () => {
    setKeyword('');
    logout();
  };

  const handleAuth = () => {
    if (isAuthenticated) {
      const getToken = localStorage.getItem('token');
      const decodeToken = jwtDecode(getToken);
      const role = decodeToken.role;
      if (role === 'admin') {
        setAnchor([
          { id: 1, name: 'Assets list', path: '/', icon: <ShoppingIcon /> },
          {
            id: 2,
            name: 'Upload Assets',
            path: '/product/upload',
            icon: <UploadIcon />,
          },
        ]);
      } else if (role === 'user') {
        setAnchor([
          { id: 1, name: 'Assets list', path: '/', icon: <ShoppingIcon /> },
        ]);
      }
    } else {
      setAnchor([
        { id: 1, name: 'Assets list', path: '/', icon: <ShoppingIcon /> },
      ]);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <nav
      className={`sm:hidden fixed z-40 ${
        isOpen ? 'top-0' : 'top-[-100%]'
      } h-auto w-full bg-cyan-950 duration-300`}
    >
      <CancelIcon
        className={`${
          isOpen ? 'top-5' : 'top-[-100%]'
        } text-2xl text-white fixed left-5 hover:text-gray-200 duration-1000 cursor-pointer`}
        onClick={toggleMenu}
      />
      <ul className='flex flex-col justify-center items-center gap-5 p-20'>
        {anchor?.map((item) => (
          <Link
            to={item?.path}
            className='flex items-center w-[200px] gap-5 justify-between p-2 text-white font-bold hover:bg-gray-600 duration-300 rounded-lg'
            key={item?.id}
            onClick={() => setIsOpen(false)}
          >
            <div className='text-2xl'>{item?.icon}</div>
            <p className='w-full text-start'>{item?.name}</p>
          </Link>
        ))}

        {isAuthenticated ? (
          <div
            className='flex items-center w-[200px] gap-5 justify-between p-2 text-white font-bold hover:bg-gray-600 duration-300 rounded-lg'
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
          >
            <div className='text-2xl'>
              <LogoutIcon />
            </div>
            <p className='w-full text-start'>Log out</p>
          </div>
        ) : (
          <div
            className='flex items-center w-[200px] gap-5  justify-between p-2 text-white font-bold hover:bg-gray-600 duration-300 rounded-lg'
            onClick={() => {
              navigate('/login');
              setIsOpen(false);
            }}
          >
            <div className='text-2xl'>
              <LoginIcon />
            </div>
            <p className='w-full text-start'>Log in</p>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBarDrawer;
