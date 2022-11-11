import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getLyric } from '../../apis/song';
import Error from '../Common/Error';

interface LyricsProps {
    lyric?: any;
}

const Lyrics: FC<LyricsProps> = ({ lyric }) => {
    const [showMore, setShowMore] = useState(false);
    const { key } = useParams();

    const { data, error } = useSWR(`lyric-${key}`, () => getLyric(String(key)));

    function createMarkup() {
        return { __html: lyric?.lyric?.lyric || data?.lyric?.lyric };
    }

    console.log(data);

    console.log(key);

    const handleShowMoreLyrics = () => {
        if (showMore === false) {
            setShowMore(true);
        } else {
            setShowMore(false);
        }
    };

    if (error) {
        return <Error />;
    }
    return (
        <div className='mt-4 mb-5 font-semibold text-xl leading-loose text-gray-500 bg-[rgba(28,30,32,0.02)] p-4'>
            <h1>Lời Bài hát</h1>

            <div className='font-normal text-sm mt-4 leading-8'>
                {lyric?.lyric?.lyric || data?.lyric?.lyric ? (
                    <>
                        <div
                            dangerouslySetInnerHTML={createMarkup()}
                            className={`${
                                showMore ? 'h-full' : 'h-[60px]'
                            } overflow-hidden`}
                        />
                        <div
                            className='cursor-pointer hover:text-second-color w-[80px] text-13px text-main-color mt-[12px]'
                            onClick={handleShowMoreLyrics}
                        >
                            {!showMore ? 'Xem thêm' : 'Thu gọn'}
                        </div>
                    </>
                ) : (
                    <p>Không tìm thấy lời bài hát</p>
                )}
            </div>
        </div>
    );
};

export default Lyrics;
