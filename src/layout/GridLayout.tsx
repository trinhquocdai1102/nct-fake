import React, { FC } from 'react';

interface GridLayoutProps {
    children: React.ReactNode;
    col: number;
}

const GridLayout: FC<GridLayoutProps> = ({ children, col }) => {
    return (
        <div
            className={`grid grid-cols-2 ${
                col === 6
                    ? 'xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4'
                    : col === 3
                    ? 'xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3'
                    : 'xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4'
            } gap-4`}
        >
            {children}
        </div>
    );
};

export default GridLayout;
