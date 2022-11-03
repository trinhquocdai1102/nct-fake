import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GrClose } from 'react-icons/gr';
import { imgNotFound } from '../../utils/constants';
import { Song } from '../../context/PlayerContext';
import { Link } from 'react-router-dom';
import PlayerList from './PlayerList';
import SongLyrics from './PlayerLyrics';

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
    return (
        <div
            className={`bg-[rgba(28,30,32,0.02)] rounded-md mb-5 relative ${
                showListSong && 'h-full'
            }`}
        >
            <div className='w-full flex justify-center md:hidden'>
                <div className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center my-1'>
                    <GrClose className='w-3 h-3 text-white' />
                </div>
            </div>
            {showListSong ? (
                <PlayerList
                    setCurrentIndex={setCurrentIndexMemo}
                    songIds={songMemo}
                />
            ) : (
                <div>
                    <div className='pr-4 pl-4 pb-4'>
                        <div className='w-full aspect-[1/1]'>
                            <LazyLoadImage
                                className='rounded-md border'
                                src={thumbnail || imgNotFound}
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
            <SongLyrics id={id} />
        </div>
    );
};

export default PlayerThumb;
