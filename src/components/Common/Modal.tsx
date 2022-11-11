import React, { FC, useEffect, useRef } from 'react';
import { TfiClose } from 'react-icons/tfi';

interface ModalProps {
    content?: string;
    handleClick?: () => void;
    openModal: boolean;
    setOpenModal: Function;
}

const Modal: FC<ModalProps> = ({
    content,
    handleClick,
    openModal,
    setOpenModal,
}) => {
    const modalRef = useRef<HTMLDivElement | any>();

    useEffect(() => {
        const handler = (e: { target: any }) => {
            if (!modalRef.current.contains(e.target)) {
                setOpenModal(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    return (
        <div
            className={`${
                openModal ? 'flex' : 'hidden'
            } fixed top-0 left-0 right-0 bottom-0 justify-center xl:justify-start xl:pl-[30%] items-center bg-main-color`}
        >
            <div
                className='line bg-white w-full max-w-[400px] text-center rounded-md p-2 md:mt-[-20%]'
                ref={modalRef}
            >
                <div>
                    <TfiClose
                        className='absolute right-[16px] top-[16px] cursor-pointer hover:text-black'
                        onClick={() => setOpenModal(false)}
                    />
                </div>
                <div className='border-b p-4 text-base'>{content}</div>
                <div className='flex justify-around items-center p-6'>
                    <button
                        onClick={handleClick}
                        className='px-5 py-2 bg-[red] rounded-md capitalize text-white'
                    >
                        Đồng ý
                    </button>
                    <button
                        onClick={() => setOpenModal(false)}
                        className='px-5 py-2 bg-second-color rounded-md capitalize text-white'
                    >
                        Từ chối
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
