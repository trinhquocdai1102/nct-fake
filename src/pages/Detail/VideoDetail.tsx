import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getVideoDetail } from '../../apis/video';
import Error from '../../components/Common/Error';
import Lyrics from '../../components/Lyrics';
import VideoPlayer from '../../components/Player/Video';
import VideoPlaySkeleton from '../../components/Skeleton/VideoPlaySkeleton';
import { avatarDefault } from '../../utils/constants';

const VideoDetail = () => {
    const { key } = useParams();

    const { data, error } = useSWR(`playlist-${key}`, () => {
        if (key) {
            return getVideoDetail(key);
        }
    });

    if (error) {
        return <Error />;
    }

    return (
        <>
            {!data ? (
                <VideoPlaySkeleton />
            ) : (
                <div className='px-4'>
                    <div className='w-full aspect-video'>
                        {data?.video?.streamUrls && (
                            <VideoPlayer
                                data={data?.video?.streamUrls[0]?.streamUrl}
                                thumbnail={data?.video?.thumbnail}
                            />
                        )}
                    </div>

                    <h1 className='text-xl font-semibold mt-5'>
                        {data?.video?.title}
                    </h1>

                    <div className='mt-5 flex items-center'>
                        {data?.video?.artists?.map((item: any) => (
                            <Link
                                to={
                                    item.shortLink
                                        ? `/artist/${item.shortLink}`
                                        : '#'
                                }
                                key={item.artistId}
                            >
                                <div className='rounded-full w-10 h-10 overflow-hidden border'>
                                    <img
                                        className='rounded-full'
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = avatarDefault;
                                        }}
                                        src={item?.imageUrl ?? avatarDefault}
                                    />
                                </div>
                            </Link>
                        ))}

                        <p className='ml-3'>
                            <span className='font-semibold'>Nghệ Sĩ: </span>

                            {data?.video?.artists
                                ?.map((item: any) => item?.name)
                                .join(', ')}
                        </p>
                    </div>
                    <Lyrics />
                </div>
            )}
        </>
    );
};

export default VideoDetail;
