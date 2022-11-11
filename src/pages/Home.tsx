import React, { Fragment } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { getHome } from '../apis/home';
import Error from '../components/Common/Error';
import SongRanking from '../components/Ranking/SongRanking';
import HomeSkeleton from '../components/Skeleton/HomeSkeleton';
import Slider from '../components/Slider';
import Banner from '../components/Slider/Banner';
import SongList from '../components/Song/SongList';
import { ITopicEvent } from '../models';

const Home = () => {
    const { data, error } = useSWR('home', getHome);

    if (error) {
        return <Error />;
    }

    return (
        <>
            {!data ? (
                <HomeSkeleton />
            ) : (
                <div className='px-4 w-full'>
                    <div className='mb-10 home-banner'>
                        <Banner banners={data?.showcase} />
                    </div>

                    <div>
                        {data?.topicEvent?.map((item: ITopicEvent) => (
                            <div key={item.groupName} className='mb-5 line'>
                                <h1 className='mb-5 font-semibold text-xl'>
                                    {item.groupName.split('_')[0]}
                                </h1>
                                <Slider
                                    banners={item.listPlaylist}
                                    spacer={20}
                                />
                            </div>
                        ))}

                        <div className='mb-5'>
                            <h1 className='mb-5 font-semibold text-xl'>
                                Mới Phát Hành
                            </h1>
                            <SongList songs={data?.newRelease?.song} />
                        </div>

                        {/* <div className='mb-5'>
                            <h1 className='mb-5 font-semibold text-xl'>
                                BXH Bài Hát
                            </h1>
                            <SongRanking data={data?.ranking?.song} />
                        </div> */}

                        <div className='mb-5 line'>
                            <h1 className='mb-5 font-semibold text-xl'>
                                Top 100
                            </h1>
                            <Slider banners={data?.top100} spacer={20} />
                        </div>

                        <div className='mb-5 line'>
                            <h1 className='mb-5 font-semibold text-xl'>
                                Chủ Đề Hot
                            </h1>
                            <Slider
                                type='TOPIC'
                                banners={data?.topic}
                                spacer={20}
                            />
                        </div>

                        <div className='mb-5 line'>
                            <h1 className='mb-5 font-semibold text-xl'>
                                Video Hot
                            </h1>
                            <Slider video={true} banners={data?.video} />
                        </div>

                        <div className='mb-5 line'>
                            <h1 className='mb-5 font-semibold text-xl'>
                                Bài Hát
                            </h1>
                            <SongList songs={data?.song} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
