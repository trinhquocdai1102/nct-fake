import React, { Fragment } from 'react';
import useSWR from 'swr';
import { getTopics } from '../../apis/topic';
import Error from '../../components/Common/Error';
import ExploreSkeleton from '../../components/Skeleton/ExploreSkeleton';
import Item from '../../components/Slider/Item';
import GridLayout from '../../layout/GridLayout';
import { ITopics } from '../../models/topics';

const Topics = () => {
    const { data, error } = useSWR('topics', (): Promise<ITopics> => {
        return getTopics();
    });

    if (error) {
        return <Error />;
    }

    return (
        <>
            {!data ? (
                <div className='p-4'>
                    <ExploreSkeleton radio='1/1' col={4} />
                </div>
            ) : (
                <div className='px-4'>
                    <div>
                        <h1 className='mb-5 font-semibold text-xl'>
                            Tổng Hợp Topic
                        </h1>
                        <GridLayout col={4}>
                            {data?.topic?.map((item) => (
                                <Fragment key={item.key}>
                                    <Item item={item} type='TOPIC' />
                                </Fragment>
                            ))}
                        </GridLayout>
                    </div>
                </div>
            )}
        </>
    );
};

export default Topics;
