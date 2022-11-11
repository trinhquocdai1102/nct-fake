import React, { useContext } from 'react';
import useSWR from 'swr';
import { getRanking } from '../apis/ranking';
import SongRanking from '../components/Ranking/SongRanking';
import SongRankingBanner from '../components/Ranking/SongRankingBanner';
import RankingSkeleton from '../components/Skeleton/RankingSkeleton';
import { SongPlayerContext } from '../context/SongPlayerContext';

const Ranking = () => {
    const { data } = useSWR('bxh', getRanking);
    const { setSongList, setCurrentIndex, setAudioPlaying } =
        useContext(SongPlayerContext);

    const handlePlayAll = (index: number) => {
        if (!data) return;
        setCurrentIndex(index);
        setAudioPlaying(true);
        setSongList(
            data?.ranking?.song?.map((item: any) => ({
                title: item.title,
                thumbnail: item.thumbnail,
                artists: item.artists,
                key: item.songKey,
            }))
        );
    };
    return (
        <div className='px-4'>
            <div>
                {!data ? (
                    <RankingSkeleton />
                ) : (
                    <div>
                        <h1 className='text-xl font-semibold'>
                            Bảng xếp hạng âm nhạc
                        </h1>

                        <div>
                            <SongRankingBanner
                                handlePlayAll={handlePlayAll}
                                data={data?.ranking?.song[0]}
                            />
                        </div>

                        <div className='mt-5'>
                            {data?.ranking?.song?.map(
                                (item: any, index: number) => (
                                    <SongRanking
                                        key={item.songKey}
                                        data={item}
                                        index={index}
                                        handlePlayAll={handlePlayAll}
                                    />
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ranking;
