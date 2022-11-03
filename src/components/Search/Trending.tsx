import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface TrendingProps {
    position: string;
    name: string;
}

const Trending: FC<TrendingProps> = ({ position, name }) => {
    return (
        <Link
            to={`/results?q=${name}`}
            className='bg-gray-200 py-1 px-2 flex items-center rounded-sm cursor-pointer hover:text-second-color text-main-color'
        >
            <span className='text-second-color font-semibold'>#{position}</span>

            <p className='text-sm font-normal ml-1'>{name}</p>
        </Link>
    );
};

export default Trending;
