import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className=' font-poppins bg-shopping bg-cover'>
        <div
          className='hidden lg:block absolute top-5 left-5 text-white cursor-pointer'
          onClick={() => navigate('/')}
        >
          <FaArrowLeftLong className='text-3xl hover:text-gray-300 duration-300' />
        </div>

        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
