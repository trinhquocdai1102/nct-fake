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

                        <div className='mb-5'>
                            <h1 className='mb-5 font-semibold text-xl'>
                                BXH Bài Hát
                            </h1>
                            <SongRanking songs={data?.ranking?.song} />
                        </div>

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
                            <div className='flex flex-wrap video-hot'>
                                {data?.video.slice(0, 6).map((item) => {
                                    return (
                                        <Fragment key={item.key}>
                                            <div>
                                                <Link to='#'>
                                                    <div className='line overflow-hidden w-full'>
                                                        <div className='hover:scale-[1.1] ease-in duration-[400ms]'>
                                                            <img
                                                                src={
                                                                    item.thumbnail
                                                                }
                                                                alt={item.title}
                                                            />
                                                            <div className='absolute top-[46%] left-[46%] text-[40px] hover:scale-[1.2] brightness-100 text-white hidden'>
                                                                <AiFillPlayCircle />
                                                            </div>
                                                        </div>
                                                        <div className='absolute right-[10px] bottom-[8px] text-[10px] text-white bg-main-color px-2 rounded'>
                                                            {item.duration}
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className='mt-[8px]'>
                                                    <Link
                                                        to='#'
                                                        className='text-sm font-medium'
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </div>
                                                <div>
                                                    {item.artists.map((i) => {
                                                        return (
                                                            <Link
                                                                to='#'
                                                                key={i.artistId}
                                                                className='text-13px text-main-color'
                                                            >
                                                                {i.name}
                                                                <span className='last:hidden'>
                                                                    ,{' '}
                                                                </span>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </Fragment>
                                    );
                                })}
                            </div>
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
