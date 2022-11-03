import React from 'react';
import useInnerWidth from '../../hooks/useInnerWidth';
import { ISong2 } from '../../models';

const SongRanking = ({ songs }: { songs: ISong2[] }) => {
    const { isLaptop, isTablet } = useInnerWidth();
    const handleClick = (index: number) => {};

    return (
        <div className='flex flex-col sm:flex-row justify-between'>
            <div className='line pr-[16px] w-80 md:w-2/6 max-w-[416px]'>
                <div className='bg-song-ranking-vn w-full h-[160px] bg-center bg-cover bg-no-repeat rounded'></div>
                <div className='absolute top-[36px] left-[24px] text-[28px] text-white uppercase'>
                    Việt Nam
                </div>
                <div className='flex absolute bottom-[-16px] ml-[64px]'>
                    {(isLaptop
                        ? songs.slice(0, 3)
                        : isTablet
                        ? songs.slice(0, 2)
                        : songs.slice(0, 3)
                    ).map((item, index) => (
                        <div
                            key={item.songKey}
                            className='w-[80px] h-[80px] ml-[-40px] rounded overflow-hidden'
                        >
                            <img src={item.thumbnail} alt={item.title} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='line pr-[16px] w-80 md:w-2/6 max-w-[416px]'>
                <div className='bg-song-ranking-us w-full h-[160px] bg-center bg-cover bg-no-repeat rounded'></div>
                <div className='absolute top-[36px] left-[24px] text-[28px] text-white uppercase'>
                    Âu Mỹ
                </div>
            </div>
            <div className='line pr-[16px] w-80 md:w-2/6 max-w-[416px]'>
                <div className='bg-song-ranking-kr w-full h-[160px] bg-center bg-cover bg-no-repeat rounded'></div>
                <div className='absolute top-[36px] left-[24px] text-[28px] text-white uppercase'>
                    Hàn Quốc
                </div>
            </div>
        </div>
    );
};

export default SongRanking;
