import React, { FC } from 'react';

interface SongLabelProps {
    type?: string;
}

const SongLabel: FC<SongLabelProps> = ({ type }) => {
    return (
        <tr className='h-[32px] uppercase text-[13px]'>
            <th className='text-left font-bold'>Tiêu đề</th>
            <th className='text-left whitespace-nowrap font-bold'>Nghệ sĩ</th>
            <th className='text-left w-[80px] whitespace-nowrap font-bold'>
                Thời gian
            </th>
            {type === 'favorite' && (
                <th className='text-left w-[80px] whitespace-nowrap font-bold'></th>
            )}
        </tr>
    );
};

export default SongLabel;
