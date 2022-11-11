import { FC } from 'react';
import { Link } from 'react-router-dom';
import { img404 } from '../../utils/constants';

interface ErrorProps {
    title?: string;
    handler?: () => void;
}

const Error: FC<ErrorProps> = ({ title, handler }) => {
    return (
        <div className='flex items-center justify-center'>
            <div>
                <div className='mt-10'>
                    <img src={img404} alt='not-found' />
                </div>
                <div
                    className={`w-full flex justify-center ${
                        title ? 'hidden' : 'mb-8'
                    }  text-main-color`}
                >
                    {title ? '' : 'Xin lỗi trang này không tồn tại'}
                </div>
                <div
                    className={`w-full flex justify-center ${
                        title ? 'mt-0' : 'mt-4'
                    }`}
                >
                    {title ? (
                        <div
                            className='bg-gray-400 px-4 py-2 text-white rounded-md font-semibold block hover:bg-second-color cursor-pointer'
                            onClick={handler}
                        >
                            {title}
                        </div>
                    ) : (
                        <Link
                            className='bg-gray-400 px-4 py-2 text-white rounded-md font-semibold block hover:bg-second-color'
                            to='/'
                        >
                            Trở lại trang chủ
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Error;
