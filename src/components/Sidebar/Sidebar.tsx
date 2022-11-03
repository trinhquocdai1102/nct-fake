import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { sidebar } from '.';
import { auth } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../Common/Loading';
import Modal from '../Common/Modal';
import Logo from './Logo';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
    const { setOpenFormLogin, setOpenFormRegister, loading, setLoading } =
        useContext(AuthContext);
    const [isLogged, setIsLogged] = useState<any>();
    const [openModal, setOpenModal] = useState(false);

    const modalContent = { content: 'Bạn có chắc chắn muốn đăng xuất ?' };

    const handleLogout = async () => {
        await signOut(auth);
        toast.success('Tài khoản đã được đăng xuất !');
    };

    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (currentUser) => {
            setIsLogged(currentUser);
            setOpenModal(false);
            setLoading(false);
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
                    <Loading />
                ) : (
                    <div className='ml-4 text-sm'>
                        {isLogged ? (
                            <div className='flex flex-col items-start'>
                                <span>{isLogged?.email}</span>
                                <button
                                    className='text-[15px] font-bold'
                                    onClick={() => setOpenModal(true)}
                                >
                                    Đăng xuất
                                </button>
                                <Modal
                                    content={modalContent.content}
                                    handleClick={handleLogout}
                                    openModal={openModal}
                                    setOpenModal={setOpenModal}
                                />
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
        </div>
    );
};

export default Sidebar;
