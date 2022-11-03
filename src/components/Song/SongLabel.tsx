import React from 'react';

const SongLabel = () => {
    return (
        <tr className='h-[32px] uppercase text-[13px]'>
            <th className='text-left font-[700]'>Tiêu đề</th>
            <th className='text-left whitespace-nowrap font-[700]'>Nghệ sĩ</th>
            <th className='text-left w-[80px] whitespace-nowrap font-[700]'>
                Thời gian
            </th>
        </tr>
    );
};

export default SongLabel;
