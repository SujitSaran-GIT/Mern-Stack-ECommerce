import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader.jsx'


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp =new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'
    
    useEffect(() =>{
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await login({email, password}).unwrap()
            console.log(res)
            dispatch(setCredentials({...res}))
            toast.success("Login successfully....")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }


  return (
    <>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
            <form onSubmit={submitHandler} className="container w-[40rem]">
                <div className="my-[2rem]">
                    <label htmlFor="email" className="block text-sm font-medium text-black">Email Address</label>
                    <input 
                        type="email" name="" 
                        id="email" 
                        value={email}
                        className="mt-1 p-2 border rounded w-full" 
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>
                <div className="my-[2rem]">
                    <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                    <input 
                        type="password" name="" 
                        id="password" 
                        value={password}
                        className="mt-1 p-2 border rounded w-full" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </div>
                <button disabled={isLoading} type="submit" className="bg-pink-500 text-white px-4 py-4 rounded cursor-pointer my-[1rem]">
                    {isLoading ? "Signing in...":"Sign In"}
                </button>
                {isLoading && <Loader/> }
            </form>
            <div className="mt-4">
                <p className="text-white">
                    New Customer? {" "}
                    <Link to={redirect ? `/register?redirect=${redirect}`:'/register'} className='text-pink-500 hover:underline'>Register</Link>
                </p>
            </div>
        </div>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0y3NVqfcVX7mY7sX21j3f7tIeiPRWoUDSlMWQ1z7jAs1wTcTrAphwP2M&s" alt="" className='h-[65rem] w-[59%] xl-block md:hidden sm:hidden rounded-lg'/>
        
      </section>
      {/* className='h-[65rem] w-[59%] xl-block md:hidden sm:hidden rounded-lg' */}
    </>
  )
}

export default Login