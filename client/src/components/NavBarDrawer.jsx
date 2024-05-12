import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Authentication';
import { FaBars as HamburgerIcon, FaTimes as CancelIcon } from 'react-icons/fa';
import { CiLogout as LogoutIcon, CiLogin as LoginIcon } from 'react-icons/ci';
import { useApp } from '../context/AppContext';
import { useModal } from '../context/ModalContext/state';

const NavBarDrawer = ({ toggleMenu, isOpen, setIsOpen, anchor }) => {
  const { setKeyword } = useApp();
  const { logout, isAuthenticated } = useAuth();
  const {
    loginModal: { setModalLogin },
  } = useModal();

  const handleLogout = () => {
    setKeyword('');
    logout();
  };

  return (
    <>
      <nav
        className={`md:hidden fixed z-40 ${
          isOpen ? 'top-0' : 'top-[-100%]'
        } h-auto w-full bg-cyan-950 duration-300`}
      >
        <CancelIcon
          className={`${
            isOpen ? 'top-5' : 'top-[-100%]'
          } text-2xl text-white fixed left-5 hover:text-gray-200 duration-300 cursor-pointer`}
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
                setModalLogin((prev) => ({ ...prev, visible: true }));
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
    </>
  );
};

export default NavBarDrawer;
