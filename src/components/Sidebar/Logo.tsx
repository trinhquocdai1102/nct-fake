import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
    width: string | number;
    height: string | number;
}

const Logo: FC<LogoProps> = ({ width, height }) => {
    return (
        <Link to='/'>
            <div
                style={{ width: width, height: height }}
                className='rounded-md flex items-center justify-center'
            >
                <img
                    src='https://stc-id.nixcdn.com/v12/static/media/logo.5a1f4537.png'
                    alt='logo'
                />
            </div>
        </Link>
    );
};

export default Logo;
