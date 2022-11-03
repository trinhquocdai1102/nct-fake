import React from 'react';
import useInnerWidth from '../../hooks/useInnerWidth';
import GridLayout from '../../layout/GridLayout';

const SliderSkeleton = () => {
    const { isTablet, isPC } = useInnerWidth();

    return (
        <div className='my-5'>
            <div>
                <h1 className='mb-5 skeleton h-6 w-[150px]'></h1>
            </div>
            <GridLayout col={6}>
                <div className='skeleton aspect-[1/1] rounded-md'></div>
                <div className='skeleton aspect-[1/1] rounded-md'></div>
                {isTablet && (
                    <>
                        <div className='skeleton aspect-[1/1] rounded-md'></div>
                        <div className='skeleton aspect-[1/1] rounded-md'></div>
                    </>
                )}
                {isPC && (
                    <>
                        <div className='skeleton aspect-[1/1] rounded-md'></div>
                        <div className='skeleton aspect-[1/1] rounded-md'></div>
                    </>
                )}
            </GridLayout>
        </div>
    );
};

export default SliderSkeleton;
