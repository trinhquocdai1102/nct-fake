import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { img404 } from '../../utils/constants';

const Error = () => {
    return (
        <div className='flex items-center justify-center'>
            <div>
                <div className='mt-10'>
                    <img src={img404} alt='not-found' />
                </div>
                <div className='w-full flex justify-center mb-8 text-main-color'>
                    Xin lỗi trang này không tồn tại
                </div>
                <div className='w-full flex justify-center mt-4'>
                    <Link
                        className='bg-gray-400 px-4 py-2 text-white rounded-md font-semibold block hover:bg-second-color'
                        to='/'
                    >
                        Trở lại trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;
