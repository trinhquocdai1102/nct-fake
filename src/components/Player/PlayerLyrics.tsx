import React from 'react';
import { FcMusic } from 'react-icons/fc';
import useSWR from 'swr';
import { getLyric } from '../../apis/song';

const SongLyrics = ({ id }: { id: string }) => {
    const { data: lyric, error: errorLyric } = useSWR(`lyric-${id}`, () =>
        getLyric(String(id))
    );

    function createMarkup() {
        return { __html: lyric?.lyric?.lyric };
    }

    return (
        <div className='fixed right-0 left-0 top-0 bottom-0 p-2 rounded-md shadow-md z-[999] cursor-pointer bg-black hidden'>
            <div className='flex items-center font-semibold text-sm'>
                <div className='line-clamp-1'>
                    {lyric?.lyric?.lyric ? (
                        <div dangerouslySetInnerHTML={createMarkup()} />
                    ) : (
                        <p>Không tìm thấy lời bài hát</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SongLyrics;
