import React, { FC, useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GrClose } from 'react-icons/gr';
import { imgNotFound } from '../../../utils/constants';
import { Song } from '../../../context/SongPlayerContext';
import { Link } from 'react-router-dom';
import PlayerList from './PlayerList';
import { CommonContext } from '../../../context/CommonContext';

interface PlayerThumbProps {
    thumbnail: string;
    title: string;
    artists: string;
    showListSong: boolean;
    songMemo: Song[];
    id: string;
    setCurrentIndexMemo: Function;
}

const PlayerThumb: FC<PlayerThumbProps> = ({
    title,
    thumbnail,
    artists,
    showListSong,
    songMemo,
    id,
    setCurrentIndexMemo,
}) => {
    const { setOpenPlayer } = useContext(CommonContext);
    return (
        <div
            className={`bg-[rgba(28,30,32,0.02)] rounded-md mb-5 relative ${
                showListSong && 'h-full'
            }`}
        >
            <div className='w-full flex justify-end md:hidden'>
                <div className='w-5 h-5 rounded-full flex items-center justify-center my-1 text-white hover:text-third-color'>
                    <GrClose
                        className='w-5 h-5 cursor-pointer'
                        onClick={() => setOpenPlayer(false)}
                    />
                </div>
            </div>
            {showListSong ? (
                <PlayerList
                    setCurrentIndex={setCurrentIndexMemo}
                    songList={songMemo}
                />
            ) : (
                <div>
                    <div className='pr-4 pl-4 pb-4'>
                        <div className='w-full aspect-[1/1]'>
                            <LazyLoadImage
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = imgNotFound;
                                }}
                                className='rounded-md border'
                                src={thumbnail ?? imgNotFound}
                                effect='blur'
                            />
                        </div>

                        <div className='mt-5'>
                            <h1 className='font-semibold line-clamp-1'>
                                {title}
                            </h1>
                            <p className='text-sm text-gray-400 font-normal line-clamp-1'>
                                {artists}
                            </p>

                            {title && artists && (
                                <Link
                                    to={`/SONG/${id}`}
                                    className='text-blue-500 text-sm mt-2'
                                >
                                    Xem lời bài hát
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayerThumb;
