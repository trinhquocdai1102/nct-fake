import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useContext, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineSetting, AiOutlineLogin } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sidebar } from '.';
import { auth } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import { addUser } from '../../store/authSlice';
import { avatarDefault } from '../../utils/constants';
import Logo from './Logo';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
    const {
        setOpenFormLogin,
        setOpenFormRegister,
        loading,
        setLoading,
        setCurrentUser,
        logged,
        setLogged,
        isLogged,
    } = useContext(AuthContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openSetting, setOpenSetting] = useState(false);
    const settingRef = useRef<HTMLDivElement | any>();

    const handleLogout = async () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất ?')) {
            await signOut(auth);
            setCurrentUser([]);
            navigate('/');
            toast.success('Tài khoản đã được đăng xuất !');
        }
    };

    useEffect(() => {
        const handler = (e: { target: any }) => {
            if (!settingRef?.current?.contains(e.target)) {
                setOpenSetting(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    useEffect(() => {
        onAuthStateChanged(auth, (curr: any) => {
            setLogged(curr);
            setLoading(false);

            dispatch(
                addUser({
                    email: curr?.email,
                    name: 'user.music' + '.' + curr?.metadata?.createdAt,
                    id: curr?.metadata?.createdAt,
                })
            );
            setCurrentUser({ email: curr?.email });
        });
    }, []);

    return (
        <div>
            <div className='flex justify-around items-center'>
                <Logo width={48} height={24} />
                <div
                    style={{
                        padding: '3.5px 13px 3px 12px',
                        borderRadius: '12px',
                    }}
                    className='border uppercase flex items-center text-13px'
                >
                    <Link to='/upgrade-vip' className='text-gray-400'>
                        Nâng cấp
                    </Link>
                </div>
            </div>
            <div className='flex items-center justify-between mt-4 py-4 bg-slate-100 text-slate-600'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='ml-4 text-sm w-full'>
                        {isLogged && isLogged !== undefined && logged ? (
                            <div className='flex flex-col items-start'>
                                <div className='flex items-center justify-between w-full'>
                                    <Link
                                        to={`/user/profile/${isLogged?.name}`}
                                        className='flex items-center '
                                    >
                                        <div className='w-[24px] h-auto rounded-full overflow-hidden mr-1'>
                                            <img
                                                onError={({
                                                    currentTarget,
                                                }) => {
                                                    currentTarget.onerror =
                                                        null;
                                                    currentTarget.src =
                                                        avatarDefault;
                                                }}
                                                src={
                                                    isLogged?.avatar ??
                                                    avatarDefault
                                                }
                                                alt='user-avatar'
                                            />
                                        </div>
                                        <p className='truncate max-w-[120px]'>
                                            {isLogged?.name}
                                        </p>
                                    </Link>
                                    <div
                                        className='line'
                                        onClick={() => setOpenSetting(true)}
                                    >
                                        <AiOutlineSetting className='text-xl mr-4 cursor-pointer' />
                                        <div
                                            className={`${
                                                openSetting ? 'block' : 'hidden'
                                            } absolute shadow-main bg-white p-2`}
                                            ref={settingRef}
                                        >
                                            <div
                                                className='text-[15px] w-[120px] flex items-center cursor-pointer'
                                                onClick={handleLogout}
                                            >
                                                <AiOutlineLogin className='mr-2' />
                                                <span>Đăng xuất</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <span
                                    className='cursor-pointer hover:text-second-color'
                                    onClick={() => setOpenFormLogin(true)}
                                >
                                    Đăng nhập
                                </span>
                                <span>{' | '}</span>
                                <span
                                    className='cursor-pointer hover:text-second-color'
                                    onClick={() => setOpenFormRegister(true)}
                                >
                                    Đăng ký
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>
            <ul className='mt-4 text-13px'>
                {sidebar.map((item) => (
                    <SidebarItem key={item.name} item={item} />
                ))}
            </ul>
            {isLogged && isLogged !== undefined && logged && (
                <div className='mt-4 text-sm pl-4'>
                    <h1 className='my-4 uppercase font-bold'>Thư viện</h1>
                    <div className='text-13px'>
                        <Link to={`/favorite/${isLogged?.name}`}>
                            NhacCuaTui
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
