import React from 'react';

const ProfileDetailSkeleton = () => {
    return (
        <div className='px-4'>
            <div className='flex md:flex-row flex-col justify-left'>
                <div className='flex items-center justify-center'>
                    <div className='w-[160px] max-w-full aspect-[1/1] rounded-md skeleton'></div>
                </div>

                <div className='flex-1 md:ml-5 ml-0 md:mt-0 mt-5'>
                    <p className='skeleton h-5 w-[80%] max-w-[400px] mb-5'></p>
                    <p className='skeleton h-5 w-[80%] max-w-[400px] mb-5'></p>
                    <p className='skeleton h-5 w-[80%] max-w-[400px] mb-5'></p>
                    <div className='mt-6 flex items-center gap-2'>
                        <div className='w-[100px] py-4 skeleton rounded-sm'></div>
                    </div>
                </div>
            </div>

            <div className='my-4 skeleton h-[48px]'> </div>
        </div>
    );
};

export default ProfileDetailSkeleton;
