import React from 'react'
import { useState } from 'react'
// import {AiOutlinehome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart} from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { AiOutlineHome, AiOutlineLogin, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css'
import { useLogoutMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import { FaChevronDown } from "react-icons/fa";
import FavoritesCount from '../Products/FavoritesCount';


const Navigation = () => {
    const { userInfo } = useSelector(state => state.auth)
    const { cartItems } = useSelector((state) => state.cart)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const closeSidebar = () => {
        setShowSidebar(false)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div style={{ zIndex: 999 }} className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black 
    w-[4%] hover:w-[15%] h-[100vh] fixed`} id='navigation-container'>
            <div className="flex flex-col justify-center space-y-1">
                <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
                    <span className="hiddden nav-item-name mt-[3rem]">Home</span>
                </Link>
                <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
                    <span className="hiddden nav-item-name mt-[3rem]">Shop</span>
                </Link>
                <Link to="/cart" className="flex relative">
                    <div className="flex items-center transition-transform transform hover:translate-x-2">
                        <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
                        <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
                    </div>

                    <div className="absolute top-9">
                        {cartItems.length > 0 && (
                            <span>
                                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            </span>
                        )}
                    </div>
                </Link>
                <Link to='/favorite' className='flex items-center transition-transform transform hover:translate-x-2'>
                    <FaHeart className='mr-2 mt-[3rem]' size={26} />
                    <span className="hiddden nav-item-name mt-[3rem]">Favorite</span> {" "}
                    <FavoritesCount />
                </Link>
            </div>

            <div className="relative">
                <button onClick={toggleDropdown} className='flex items-center text-gray-8000 focus:outline-none'>
                    {userInfo ? <span className='text-white'>{userInfo.username}</span> : (<></>)}
                    {userInfo && <FaChevronDown className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`} />}
                </button>
                {dropdownOpen && userInfo && (
                    <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}>
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to='/admin/dashboard' className='block px-4 py-2 hover:bg-gray-300'>Dashboard</Link>
                                </li>
                                <li>
                                    <Link to='/admin/productlist' className='block px-4 py-2 hover:bg-gray-300'>Products</Link>
                                </li>
                                <li>
                                    <Link to='/admin/categorylist' className='block px-4 py-2 hover:bg-gray-300'>Category</Link>
                                </li>
                                <li>
                                    <Link to='/admin/orderlist' className='block px-4 py-2 hover:bg-gray-300'>Orders</Link>
                                </li>
                                <li>
                                    <Link to='/admin/userlist' className='block px-4 py-2 hover:bg-gray-300'>Users</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to='/admin/profile' className='block px-4 py-2 hover:bg-gray-300'>Profile</Link>
                        </li>
                        <li>
                            <button onClick={logoutHandler} className='block w-full px-4 py-2 text-left hover:bg-grey-100'>Logout</button>
                        </li>
                    </ul>
                )}
            </div>
            {!userInfo && (
                <ul className='flex flex-col justify-center space-y-0'>
                    <li>
                        <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
                            <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
                            <span className="hiddden nav-item-name mt-[3rem]">Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
                            <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
                            <span className="hiddden nav-item-name mt-[3rem]">Register</span>
                        </Link>
                    </li>
                </ul>
            )}

        </div>
    )
}

export default Navigation