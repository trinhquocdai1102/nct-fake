import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BsKeyboard } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { TfiClose } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
import Loading from './Common/Loading';

const Register = () => {
    const {
        registerUser,
        setRegisterUser,
        setOpenFormRegister,
        setOpenFormLogin,
        setLoading,
        loading,
    } = useContext(AuthContext);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [registerValue, setRegisterValue] = useState<any>();
    const formRef = useRef<HTMLDivElement | any>();

    const handleCloseFormRegister = () => {
        setOpenFormRegister(false);
        setRegisterUser({
            email: '',
            password: '',
            username: '',
            rePassword: '',
            name: '',
            id: '',
        });
    };

    const handleCheckBoxValue = (e: any) => {
        setCheckboxValue(e.target.checked);
    };

    const handleRegister = async () => {
        try {
            if (registerValue.password.length < 6) {
                toast.error('Mật khẩu tối thiểu 6 ký tự');
            } else if (registerValue.password !== registerValue.rePassword) {
                toast.error('Mật khẩu không khớp');
            } else if (
                !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    registerValue.email
                )
            ) {
                toast.error('Email không hợp lệ');
            } else {
                setLoading(true);
                await createUserWithEmailAndPassword(
                    auth,
                    registerValue.email,
                    registerValue.password
                );
                setOpenFormRegister(false);
                setOpenFormLogin(false);
                setLoading(false);
                toast.success('Đăng nhập thành công');
                toast.success('Đăng ký thành công');
            }
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                toast.error('Email đã tồn tại');
            } else if (err.code === 'auth/invalid-email') {
                toast.error('Email không hợp lệ');
            } else {
                toast.error('Có lỗi xảy ra');
            }
        }
    };

    useEffect(() => {
        const handler = (e: { target: any }) => {
            if (!formRef.current.contains(e.target)) {
                setOpenFormRegister(false);
                setRegisterUser({
                    email: '',
                    password: '',
                    username: '',
                    rePassword: '',
                    name: '',
                    id: '',
                });
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
                handleRegister();
            }
        };
        document.addEventListener('keypress', handler);
        return () => {
            document.removeEventListener('keypress', handler);
        };
    });

    useEffect(() => {
        setRegisterValue(registerUser);
    }, [registerUser]);

    if (loading) {
        return <Loading />;
    }
    return (
        <div className='fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 w-full bg-[rgba(0,0,0,0.5)] z-[999]'>
            <div
                className='w-full max-w-[480px] bg-white rounded-md line'
                ref={formRef}
            >
                <div className='absolute right-[20px] top-[20px]'>
                    <TfiClose
                        className='text-xl text-main-color cursor-pointer hover:text-black'
                        onClick={handleCloseFormRegister}
                    />
                </div>
                <div className='border-b-[1px] font-bold'>
                    <p className='flex items-center justify-center h-[64px]'>
                        Đăng ký
                    </p>
                </div>
                <div className='flex flex-col items-center mt-[20px] gap-2'>
                    <div className='flex items-center w-[80%] max-w[380px] h-[40px] line'>
                        <div className='flex items-center justify-center h-[40px] w-[40px] border-r absolute'>
                            <HiOutlineMail className='text-main-color' />
                        </div>
                        <input
                            type='email'
                            className='w-full bg-third-color h-[40px] text-13px pl-[52px] pr-[12px] border focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-second-color rounded-sm'
                            placeholder='Nhập email'
                            onChange={(e) =>
                                setRegisterUser({
                                    ...registerUser,
                                    email: e.target.value,
                                })
                            }
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
                            onChange={(e) =>
                                setRegisterUser({
                                    ...registerUser,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className='flex items-center w-[80%] max-w[380px] h-[40px] line'>
                        <div className='flex items-center justify-center h-[40px] w-[40px] border-r absolute'>
                            <BsKeyboard className='text-main-color' />
                        </div>
                        <input
                            type='password'
                            className='w-full bg-third-color h-[40px] text-13px pl-[52px] pr-[12px] border focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-second-color rounded-sm'
                            placeholder='Nhập lại mật khẩu'
                            onChange={(e) =>
                                setRegisterUser({
                                    ...registerUser,
                                    rePassword: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className='flex w-[80%] max-w[380px] gap-1 pl-1 items-center text-sm pt-[12px] mt-[60px]'>
                        <input
                            type='checkbox'
                            className='mt-[-3px] mr-[2px]'
                            onChange={(e) => handleCheckBoxValue(e)}
                        />
                        <p>Tôi đã đọc và đồng ý các</p>
                        <Link to='#' className='uppercase text-second-color'>
                            Thỏa thuận sử dụng
                        </Link>
                    </div>
                    <div className='flex items-center w-[80%] max-w[380px] h-[40px] line'>
                        <button
                            disabled={
                                checkboxValue === true &&
                                registerValue &&
                                registerValue.password?.length > 0 &&
                                registerValue.email?.length > 0 &&
                                registerValue.rePassword?.length
                                    ? false
                                    : true
                            }
                            onClick={handleRegister}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleRegister();
                                }
                            }}
                            className='w-full bg-third-color h-[37px] text-sm bg-gradient-to-r from-[#2F80ED] to-[#00AEEF] rounded-md text-white font-bold mt-[24px]'
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
                <div className='flex items-center justify-center mt-[36px] mb-[12px] text-sm'>
                    <p className='text-main-color'>Đăng nhập NCT ID:</p>
                    <Link
                        to='#'
                        onClick={() => {
                            setOpenFormRegister(false);
                            setOpenFormLogin(true);
                        }}
                        className='flex justify-center items-center w-[52px] h-[52px] rounded-full bg-third-color text-[25px] mx-4'
                    >
                        <img
                            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAyCAYAAAAayliMAAAABHNCSVQICAgIfAhkiAAABKJJREFUaEPtWE2IW1UU/s4dnDiLLpyMLqoLQcFKEkSkijiuqlARBcVJkIKOP2B36sJNRW0VXQjSLnWhVgVLUn/wX6SzKqI4CIXM1A4qrpyFJqO0i5kMeD857+Ummfhe3n2Zl8pAZhXm3nfO+c7fd84V7PA/2eH2Ywzg/47gOALjCGzTA+MUinNgobp2G4Bpd75cmf5sm86O/DyzCKjBRvg4wFsBuS5KG8ELgJwi+clyZeadLABtG0ChunaPwD4nInvTGKRgKPL88lz+WJrv+u8ODeDa2oXLp9A6Aci+rlCuEPI1KQtmwv5cf2DmnDsLgfImEc5u+YZctTDl5cr0t8MAGQqApouI/Uogu1QpgY9Jec3XCAV/KTafBfhoRwZxZKmSP5wWRGoAW43niqV5zNfwfuPaQN4Q4L7AEUOASAUgVNj6Vb2mXt/A5BO/lHf9mdZr/fcLJ5tPGeKo/t9S7k3TsVIBKFYbP2ixZml8p0Z6QKxj8gpfx3gDcF4ahfH9IFTHUjl/v09kvQGUqo3fA4ET2NfbXaKUBCRmuFeIq4Nz4m9CfvRJjVKtcUq7lKXM+tSWFwBtgUb4qSXn4wio9EFjD628AvAO11kiyYxcJMxLcWB66uzDejn/SFIUvACUas23SRY2JHd3VG7qOYD5JGVbz7myjtztUfKKteYxIefqlZkrk2R6AmicsyKvO9YsVBsPtyT3pQqfQut03OiQpLzddYJUUZkuuiFJbv4Bw+uT0tULQLHWOL+B3DVtg08QsrSByZe3a7wDqPmuvw1szbGy1oIl3kuambwAqLB15B5Ug0mc11T67xjh4+/oOzoXqYOUnQV4UgEJeCfB3zICENaAcoAWMoxc5ohneLP7v+SCOskRpRU8Dcu/MgHQITByMfA+W2cgsjs740NJgeeFcxoFX1YemELdGT/sMDqraFiNyPFBxqv3DHFD2s6kBCaGh2Dlp1AfF2nk/UEjdyyAoBOwdYYiJ3s8MhsuLYNbpuOLYPCDPeq9K5Cr2joD0hTZHQAib7HAobhUigUQ9GJwPyFndVrsFBpbXyQZ1E94OoYI+eIggnMR1Tmo0yDI1dCB3F8vz+yJinosgLYXvnHFC3BFhZRqTSblfhRj94/OcTL0WxG5sRt1zgcpG8MJ8QBCQ49nBcAZXKw1P3LzfxSIOABxY8xFjcAUNl/1qZ+oCMQNd4k1AMh3Tmm9nBfXUgd2ob6hb+gaQLBjnwV5VdwcNrALKakA8tawXSiYUP/Bu0lF33VGOOA5nul2IXMwbnr14AF7hMDNwRqZggd0F3DAk4renffzAMAFK/L5UDzQq7RYbR4WwQudTtTu076G+d7rZWIlsbi06ZXnNczpBy73L8YsFLKwuSuzjUwFth+yTuvvkA/C1c/XuwPvkau6qtLKQX0rIs0Bn/VTZXpHoAdEpvtA8MRIcwDAmhH7pqV5xtf41ACcF7PayJzxarCT6fuc4mxJFYG4NBhmJ9YilQk8lLQyJqVoJgBUie+rRNAaPVbFJMMzjUC/srh3oZZc8n3aFEkCklkEkhSN6nwMYFSe9ZU7joCvp0Z1bxyBUXnWV+6Oj8C/t8DjUS6AbpYAAAAASUVORK5CYII='
                            alt='logo-nct'
                            className='w-[28px] h-auto'
                        />
                    </Link>
                    <p>Hoặc</p>
                    <div className='flex justify-center items-center w-[52px] h-[52px] rounded-full bg-third-color text-[25px] mx-4 cursor-pointer'>
                        <FaFacebookF className='text-[rgb(59,89,152)]' />
                    </div>
                    <div className='flex justify-center items-center w-[52px] h-[52px] rounded-full bg-third-color text-[25px] cursor-pointer'>
                        <FcGoogle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
