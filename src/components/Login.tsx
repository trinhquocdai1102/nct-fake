import {
    FacebookAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BiUser } from 'react-icons/bi';
import { BsKeyboard } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { TfiClose } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const {
        currentUser,
        setCurrentUser,
        setOpenFormLogin,
        setOpenFormRegister,
        setLoading,
    } = useContext(AuthContext);
    const [loginValue, setLoginValue] = useState<any>();
    const formRef = useRef<any>();

    const handleCloseFormLogin = () => {
        setOpenFormLogin(false);
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(
                auth,
                loginValue.email,
                loginValue.password
            );
            setLoading(false);
            toast.success('Đăng nhập thành công');
            setOpenFormLogin(false);
            setOpenFormRegister(false);
        } catch (err: any) {
            if (err.code === 'auth/invalid-email') {
                toast.error('Email không hợp lệ');
            } else if (err.code === 'auth/user-not-found') {
                toast.error('Email không tồn tại ');
            } else if (err.code === 'auth/wrong-password') {
                toast.error('Mật khẩu không chính xác');
            } else {
                toast.error('Có một lỗi đã xảy ra');
            }
        }
    };

    const handleLoginWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const handler = (e: { target: any }) => {
            if (!formRef.current.contains(e.target)) {
                setOpenFormLogin(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    useEffect(() => {
        const handler = (e: any) => {
            if (e.key === 'Enter') {
                handleLogin();
            }
        };
        document.addEventListener('keypress', handler);
        return () => {
            document.removeEventListener('keypress', handler);
        };
    });

    useEffect(() => {
        setLoginValue(currentUser);
    }, [currentUser]);
    return (
        <div className='fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 w-full bg-[rgba(0,0,0,0.5)] z-[999]'>
            <div
                className='w-full max-w-[480px] bg-white text-md rounded-md line'
                ref={formRef}
            >
                <div className='absolute right-[20px] top-[20px]'>
                    <TfiClose
                        className='text-[20px] text-main-color cursor-pointer hover:text-black'
                        onClick={handleCloseFormLogin}
                    />
                </div>
                <div className='border-b-[1px] font-bold'>
                    <p className='flex items-center justify-center h-[64px]'>
                        Đăng nhập
                    </p>
                </div>
                <div className='flex flex-col items-center mt-[40px] gap-2'>
                    <div className='flex items-center w-[80%] max-w[380px] h-[40px] line'>
                        <div className='flex items-center justify-center h-[40px] w-[40px] border-r absolute'>
                            <BiUser className='text-main-color' />
                        </div>
                        <input
                            type='text'
                            className='w-full bg-third-color h-[40px] text-13px pl-[52px] pr-[12px] border focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-second-color rounded-sm'
                            placeholder='Nhập email'
                            onChange={(e) => {
                                setCurrentUser({
                                    ...currentUser,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className='flex items-center w-[80%] max-w[380px] h-[40px] line'>
                        <div className='flex items-center justify-center h-[40px] w-[40px] border-r absolute'>
                            <BsKeyboard className='text-main-color' />
                        </div>
                        <input
                            type='password'
                            className='w-full bg-third-color h-[40px] text-13px pl-[52px] pr-[12px] border focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-second-color rounded-sm'
                            placeholder='Nhập mật khẩu'
                            onChange={(e) => {
                                setCurrentUser({
                                    ...currentUser,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className='flex gap-2 w-[80%] max-w[380px] pl-1 items-center text-sm pt-[12px]'>
                        <input type='checkbox' className='mt-[-3px]' />
                        <p>Ghi nhớ</p>
                    </div>
                    <div className='flex items-center w-[80%] max-w[380px] h-[40px] line'>
                        <button
                            onClick={handleLogin}
                            className='w-full bg-third-color h-[37px] text-sm bg-gradient-to-r from-[#2F80ED] to-[#00AEEF] rounded-md text-white font-bold mt-[24px]'
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
                <div className='flex items-center mt-[40px] justify-center'>
                    <p className='text-sm'>Hoặc đăng nhập bằng:</p>
                    <div
                        className='flex justify-center items-center w-[52px] h-[52px] rounded-full bg-third-color text-[25px] mx-4 cursor-pointer'
                        onClick={handleLoginWithFacebook}
                    >
                        <FaFacebookF className='text-[rgb(59,89,152)]' />
                    </div>
                    <div className='flex justify-center items-center w-[52px] h-[52px] rounded-full bg-third-color text-[25px] cursor-pointer'>
                        <FcGoogle />
                    </div>
                </div>
                <div className='flex items-center justify-center my-[36px] text-sm'>
                    <p className='text-main-color'>
                        Bạn chưa có tài khoản NCT ID?
                    </p>
                    <Link
                        to='#'
                        onClick={() => {
                            setOpenFormRegister(true);
                            setOpenFormLogin(false);
                        }}
                        className='text-second-color ml-1'
                    >
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
