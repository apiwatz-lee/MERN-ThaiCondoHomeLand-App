import { useModal } from '../../context/ModalContext/state';
import { useAuth } from '../../context/Authentication';
import { useEffect } from 'react';

const ModalLogin = () => {
  const {
    loginModal: { initialLogin, modalLogin, setModalLogin },
  } = useModal();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: modalLogin.username,
      password: modalLogin.password,
    };
    login(data);
    setModalLogin(initialLogin);
  };

  useEffect(() => {
    if (modalLogin.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style = 'none';
    }
  }, [modalLogin]);

  if (!modalLogin.visible) return;

  return (
    <div
      className={`modal-container w-screen h-screen fixed z-40 flex justify-center items-center duration-1000 left-0 scroll-smooth`}
    >
      <div
        className={`overlay w-screen h-screen fixed top-0 left-0 bg-black opacity-50`}
        onClick={() => setModalLogin((prev) => ({ ...prev, visible: false }))}
      ></div>
      <div className='modal-panel absolute bg-white p-11 rounded-2xl w-[280px] h-[370px]'>
        <h1 className='text-center text-cyan-800 text-xl font-semibold'>
          Admin Login
        </h1>
        <form className='flex flex-col mt-5'>
          <div>Username</div>
          <input
            className='border rounded-full py-1 px-3 mt-2 h-10 outline-none'
            type='text'
            value={modalLogin?.username}
            onChange={(e) =>
              setModalLogin((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <div className='mt-5'>Password</div>
          <input
            className='border rounded-full py-1 px-3 mt-2 h10 outline-none'
            type='password'
            value={modalLogin?.password}
            onChange={(e) =>
              setModalLogin((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button
            className='mt-10 border p-2 rounded-full bg-cyan-800 text-white font-semibold hover:bg-cyan-900 hover:text-white'
            type='submit'
            onClick={handleLogin}
          >
            log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
