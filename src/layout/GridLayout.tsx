import React, { FC } from 'react';

interface GridLayoutProps {
    children: React.ReactNode;
    col: number;
}

const GridLayout: FC<GridLayoutProps> = ({ children, col }) => {
    return (
        <div
            className={`grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 xl:grid-cols-${col} gap-4`}
        >
            {children}
        </div>
    );
};

export default GridLayout;
