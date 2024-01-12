import React,{useState} from 'react';
import {Link, useLocation,useNavigate} from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from 'react';
import { AppContext } from '../App';
import { useAuth } from '../context/Authentication';
import { jwtDecode } from 'jwt-decode';
import { FaBars,FaTimes } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiLogout,CiLogin} from "react-icons/ci";
import logo from '../assets/img/logo.png'

export default function Navigator() {

    const location = useLocation();
    const {cart,setCart,setKeyword} = useContext(AppContext)
    const {logout,isAuthenticated} = useAuth();
    const navigate = useNavigate();

    let anchor;
    let name;

    const [isOpen,setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
   

    if(isAuthenticated){
        const getToken = localStorage.getItem('token') 
        const decodeToken = jwtDecode(getToken) 
        const role = decodeToken.role
        name = decodeToken.firstname
        if(role === 'admin'){
            anchor = [
                {id:1,name:'Assets list',path:'/',icon: <CiShoppingTag/>},
                {id:2,name:'Upload Assets',path:'/product/upload',icon:<IoCloudUploadOutline />}]
        }else if(role === 'user'){
            anchor = [{id:1,name:'Assets list',path:'/',icon:<CiShoppingTag/>}]
        }
        
    }else if(!isAuthenticated){
         anchor = [
            {id:1,name:'Assets list',path:'/',icon: <CiShoppingTag/>},
        ]
    }

    const mobileMenu = anchor.map((item)=> 
        <Link to={item.path} className='flex items-center w-[200px] gap-5 justify-between p-2 text-white font-bold hover:bg-gray-600 duration-300 rounded-lg' key={item.id}> 
            <div className='text-2xl'>{item.icon}</div>
             <p className='w-full text-start'>{item.name}</p>
        </Link>
        
        )

    const handleLogout = () => {
        setCart([])
        setKeyword('')
        logout()
    }
  
   
    return (
        <>
            <aside className={`sm:hidden fixed z-40 ${isOpen ? 'top-0':'top-[-100%]'} h-auto w-full bg-cyan-950 duration-300`}>
                <FaTimes className={`${isOpen ? 'top-5':'top-[-100%]'} text-2xl text-white fixed left-5 hover:text-gray-200 duration-1000 cursor-pointer`} onClick={toggleMenu}/>
                <ul className='flex flex-col justify-center items-center gap-5 p-20'>
                    {mobileMenu}
                    {isAuthenticated ? 
                        <div className='flex items-center w-[200px] gap-5 justify-between p-2 text-white font-bold hover:bg-gray-600 duration-300 rounded-lg' onClick={()=>handleLogout()}>
                            <div className='text-2xl'><CiLogout/></div>
                            <p className='w-full text-start'>Log out</p>
                        </div>
                        :
                        <div className='flex items-center w-[200px] gap-5  justify-between p-2 text-white font-bold hover:bg-gray-600 duration-300 rounded-lg' onClick={()=>navigate('/login')}>
                            <div className='text-2xl'><CiLogin /></div>
                            <p className='w-full text-start'>Log in</p>
                        </div>
                    }
                </ul>
            </aside>

            <nav className='flex justify-between lg:text-base items-center px-10 sm:px-20 py-5 mb-5 shadow-md sticky top-0 z-30 bg-white'>
                <ul className='hidden sm:flex justify-center items-center gap-5 lg:p-3 h-16'>
                    {anchor?.map((item)=>{
                        return <li key={item.id}>
                                    <Link 
                                    to={item.path} 
                                    className={`text-[15px] sm:text-base text-center text-gray-500 hover:text-gray-800 duration-500
                                    ${location.pathname === item.path ? 'text-gray-950 font-bold sm:font-normal underline-offset-8 sm:bg-gray-100 sm:p-2 rounded-xl':null}`}>
                                        {item.name}
                                    </Link>
                                </li>
                    })}
                </ul>

                <div className='hidden sm:flex flex-col justify-center items-center gap-2 cursor-pointer' onClick={()=>navigate('/')}>
                    <img src={logo} alt="logo" className='w-12' />
                    <p className='tracking-widest font-medium'>ThaiCondoHomeLand</p>
                </div>
               


                <ul className='relative flex justify-between sm:justify-center items-center p-3 w-full sm:w-auto'>
                    <div className='sm:hidden' onClick={toggleMenu}>
                        <FaBars className='text-2xl text-cyan-900 hover:text-gray-500 duration-300 cursor-pointer'/>
                    </div>

                    <li className='text-gray-400 flex justify-center items-center gap-1 cursor-pointer'>
                        <p> {isAuthenticated ? `Hello ${name}` : `Hello Guest`} </p>
                        <span> | </span>
                        {isAuthenticated ? 
                            <p className='hidden sm:block cursor-pointer text-red-500 font-semibold hover:text-red-700 duration-500' onClick={()=>handleLogout()}>Log out</p>
                            :
                            <p className='hidden sm:block cursor-pointer text-cyan-800 font-semibold hover:text-cyan-600 duration-500' onClick={()=>navigate('/login')}>Log in</p>
                        }
                    </li>
                </ul>
            </nav>
        </>
    )
}
        