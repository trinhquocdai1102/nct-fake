import React, { useState, Fragment } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getTopicDetail } from '../../apis/topic';
import Error from '../../components/Common/Error';
import TopicDetailSkeleton from '../../components/Skeleton/TopicDetailSkeleton';
import ItemCmp from '../../components/Slider/Item';
import GridLayout from '../../layout/GridLayout';

const TopicDetail = () => {
    const { key } = useParams();
    const [showAll, setShowAll] = useState(false);

    const { data, error } = useSWR(`topic-${key}`, () => {
        if (key) {
            return getTopicDetail(key);
        }
    });

    const playlistData = data?.topic?.playlist?.reduce(
        (arr: any, curr: any) => {
            let obj = arr.find(
                (item: any) =>
                    item.key === curr.key &&
                    item.title === curr.title &&
                    item.type === curr.type
            );
            if (obj) {
                return arr;
            } else {
                return arr.concat([curr]);
            }
        },
        []
    );

    if (error) {
        return <Error />;
    }

    const handleShowAll = () => {
        if (!showAll) {
            setShowAll(true);
        } else {
            setShowAll(false);
        }
    };

    return (
        <>
            {!data && !playlistData ? (
                <TopicDetailSkeleton />
            ) : (
                <div className='px-4'>
                    <div className='aspect-[3/1] w-full'>
                        <img
                            src={data?.topic?.coverImageURL}
                            alt={data?.topic?.title}
                        />
                    </div>

                    <div className='py-4'>
                        <p
                            className={`text-sm font-normal text-gray-500 ${
                                showAll ? 'h-auto' : ' h-[20px] truncate'
                            }`}
                        >
                            {data?.topic?.description}
                        </p>

                        <div
                            className='text-13px text-gray-500 cursor-pointer flex items-center mt-1 hover:text-second-color font-bold w-[80px]'
                            onClick={handleShowAll}
                        >
                            {showAll ? 'Thu gọn' : 'Xem thêm'}
                            <FaChevronDown
                                className={`w-3 h-3 ml-1 ${
                                    showAll ? 'rotate-180' : ''
                                }`}
                            />
                        </div>
                    </div>

                    <div>
                        <h1 className='mb-5 font-semibold text-xl'>
                            {data?.topic?.title}
                        </h1>
                        <GridLayout col={4}>
                            {playlistData?.map((item: any) => {
                                return (
                                    <Fragment key={item.key}>
                                        <ItemCmp item={item} key={item.key} />
                                    </Fragment>
                                );
                            })}
                        </GridLayout>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopicDetail;
