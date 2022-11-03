import React, { FC } from 'react';
import GridLayout from '../../layout/GridLayout';

interface SkeletonExploreProps {
    radio: string;
    col: number;
}

const SkeletonExplore: FC<SkeletonExploreProps> = ({ radio, col }) => {
    return (
        <div>
            <h1 className='mb-5 w-[150px] h-5 skeleton'></h1>

            <GridLayout col={col}>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
                <div
                    style={{ aspectRatio: radio }}
                    className={`rounded-md skeleton`}
                ></div>
            </GridLayout>
        </div>
    );
};

export default SkeletonExplore;
