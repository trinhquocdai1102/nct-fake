import React, { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import SongList from '../components/Song/SongList';
import { getMusicFromLocal } from '../utils/history';

const Music4U = () => {
    const [historyMusic, setHistoryMusic] = useState(() => getMusicFromLocal());

    const handleDeleteHistory = () => {
        if (historyMusic.length === 0) return;
        if (window.confirm('Bạn có chắc muốn xóa lịch sử đã nghe không!')) {
            localStorage.setItem('nct-history', JSON.stringify([]));
            setHistoryMusic([]);
        }
    };
    return (
        <div className='px-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>Lịch sử đã nghe</h1>
                <button onClick={handleDeleteHistory}>
                    <BsTrash className='w-6 h-6 text-blue-500' />
                </button>
            </div>

            <div>
                {historyMusic.length > 0 ? (
                    <SongList songs={historyMusic} />
                ) : (
                    <div className='w-full text-center mt-10'>
                        <h1 className='text-xl font-semibold'>
                            Chưa có lịch sử nghe gần đây!
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Music4U;
