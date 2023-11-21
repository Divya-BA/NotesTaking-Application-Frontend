import React, { useState } from 'react'
import note from '../../image/noteimg.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { loginToggle } from '../../../features/createslice/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAddUserMutation,} from '../../../features/api/apiSlice';
import { AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
const Register = (props) => {
    const [Show, setShow] = useState(false)
    const isActive = useSelector((state) => state.toggle.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addUser] = useAddUserMutation();

  
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            password: '',
            email: '',
        },
        onSubmit: values => {
           
            addUser(values)
            .then(data =>{
                toast.success('User Signup Successfylly', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                localStorage.setItem('jwtToken', data?.data?.data.token);
                navigate('/home');
               
            })
        },
        validationSchema: Yup.object().shape({
            firstname: Yup.string()
                .required('required')
                .min(3, 'firstname is too short')
                .max(10, 'firstname is too large'),
            lastname: Yup.string()
                .required('required')
                .min(1, 'lastname is too short')
                .max(10, 'lastname is too large'),
            email: Yup.string()
                .required('email canot be left blank')
                .email('Invalid Email address'),
            password: Yup.string()
                .required('Please enter password')
                .min(5, 'password should be in between from 5 to 10 caracters')
                .max(10, 'password should be in between from 5 to 10 caracters'),
        })
    });

    

    return (
        <>
            <div className='absolute top-[20%] left-[-13.5%] bg-red hidden md:block' >
                <p className={`group px-5 py-2 text-xl mb-2   ${isActive ? 'bg-black  text-white dark:text-black dark:bg-white border-none rounded-tl-[20px] rounded-bl-[20px]' : 'text-black dark:text-white'
                    } focus:outline-none focus:ring focus:bg-blue-500 focus:border-blue-500`}
                    onClick={() => dispatch(loginToggle(true))}>login</p>
                <p className={`group px-5 py-2 text-xl   ${!isActive ? 'bg-black text-white  dark:text-black dark:bg-white border-none rounded-tl-[20px] rounded-bl-[20px]' : 'text-black dark:text-white'
                    } focus:outline-none focus:ring focus:bg-blue-500 focus:border-blue-500`}
                    onClick={() => dispatch(loginToggle(false))}>sign up</p>
            </div>
            <div className='w-full animate-pop-up'>
                <div> <img src={note} alt="..loading" className='min-h-screen' /></div>
                <div className='w-[360px] md:w-[480px] h-auto absolute md:top-[8%] md:left-[25%] left-4 top-[15%] border-2 border-opacity-50 border-white rounded-xl backdrop-blur-xl bg-transparent text-white flex flex-col  '>
                    <p className='mt-2 mb-4 text-[30px] text-center font-semibold'>SignUp</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className=' w-[85%] mx-auto mb-4'>
                            <p className='mb-2 text-xl'>Firstname</p>
                            <input type="text" id='firstname' name='firstname' value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='enter your firstname' className='w-full rounded-xl h-[40px]  text-black font-semibold px-2 text-lg' />
                            {formik.errors.firstname && formik.touched.firstname ? <span className='text-red-600'>{formik.errors.firstname}</span> : null}
                        </div>
                        <div className=' w-[85%] mx-auto mb-4'>
                            <p className='mb-2 text-xl'>Lastname</p>
                            <input type="text" id='lastname' name='lastname' value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='enter your lastname' className='w-full rounded-xl h-[40px]  text-black font-semibold px-2 text-lg' />
                            {formik.errors.lastname && formik.touched.lastname ? <span className='text-red-600'>{formik.errors.lastname}</span> : null}
                        </div>
                        <div className=' w-[85%] mx-auto mb-4'>
                            <p className='mb-2 text-xl'>Email Address</p>
                            <input type="email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='enter your email..' className='w-full rounded-xl h-[40px]  text-black font-semibold px-2 text-lg' />
                            {formik.errors.email && formik.touched.email ? <span className='text-red-600'>{formik.errors.email}</span> : null}
                        </div>
                        <div className='text-xl w-[85%] mx-auto mb-6  '>
                            <p className='mb-2'>Password</p>
                            <div className='relative'>
                            <input type={`${Show ? 'text' : 'password'}`} id='password ' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='create a password' className='w-full rounded-xl h-[40px] text-black  font-semibold px-2 text-lg' />
                           
                            {
                                Show ? (
                                    <AiOutlineEye className='absolute top-2 right-6 text-black dark:text-white text-2xl cursor-pointer' onClick={()=> {setShow(!Show)}}/>
                                ) : (
                                    <AiOutlineEyeInvisible className='absolute top-2 right-6 text-black dark:text-white text-2xl cursor-pointer' onClick={()=> {setShow(!Show)}}/>
                                )
                            }
                            </div>
                            {formik.errors.password && formik.touched.password ? <span className='text-red-600'>{formik.errors.password}</span> : null}
                        </div>

                        <div className='w-[85%] mx-auto mb-4 px-4 py-2  rounded-lg text-center text-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:border-2 hover:border-red-600 hover:rounded-xl'>
                            <button type='submit'>signup</button>
                        </div>
                        <div className='w-[85%] mx-auto px-4 py-2  mb-2 rounded-lg text-center text-xl   '>
                            <button type='button'>Already Have Account?&nbsp;<span className='text-red-400 hover:text-orange-400' onClick={() => dispatch(loginToggle(true))}>Login</span></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;