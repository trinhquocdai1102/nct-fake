import { FC } from 'react';
import { BsTrash } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { imgNotFound } from '../../utils/constants';

interface SongItemProps {
    item: any;
    index: number;
    perRow?: number;
    onClick: (index: number) => void;
    handleDeleteFromFavorite?: (id: any) => void;
    type?: string;
}

const SongItem: FC<SongItemProps> = ({
    item,
    onClick,
    index,
    perRow,
    handleDeleteFromFavorite,
    type,
}) => {
    return (
        <>
            {perRow === 2 ? (
                <div
                    className='flex items-start p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer'
                    onClick={() => onClick(index)}
                >
                    <div className='w-[54px] h-[54px]'>
                        <LazyLoadImage
                            src={item?.thumbnail || imgNotFound}
                            alt={item?.title}
                            width='100%'
                            height='100%'
                            className='rounded-md'
                            effect='blur'
                        />
                    </div>
                    <div className='pl-4 pt-1 flex-1 w-[calc(100%-54px)]'>
                        <p className='font-semibold line-clamp-1 text-sm truncate'>
                            {item?.title}
                        </p>
                        <p className='rounded-sm line-clamp-1 text-gray-400 truncate text-xs mt-1'>
                            {item?.artists
                                ?.map((item: any) => item?.name)
                                .join(', ')}
                        </p>
                    </div>
                </div>
            ) : (
                <tr
                    className='p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer h-[40px]'
                    onClick={() => onClick(index)}
                >
                    <td>
                        <div className='flex gap-[8px] truncate'>
                            <div className='w-[20px] h-[20px]'>
                                <LazyLoadImage
                                    src={item?.thumbnail || imgNotFound}
                                    alt={item?.title}
                                    width='100%'
                                    height='100%'
                                    className='rounded-md'
                                    effect='blur'
                                />
                            </div>
                            <p className='line-clamp-1 text-sm'>
                                {item?.title}
                            </p>
                        </div>
                    </td>
                    <td>
                        <p className='text-gray-400 text-13px tracking-wider'>
                            {item?.artists
                                ?.map((item: any) => item?.name)
                                .join(', ')}
                        </p>
                    </td>
                    <td>
                        <p className='text-gray-400 text-13px tracking-wider'>
                            {item?.duration}
                        </p>
                    </td>
                    {type === 'favorite' && handleDeleteFromFavorite && (
                        <td>
                            <p className='flex justify-end items-center'>
                                <BsTrash
                                    onClick={() =>
                                        handleDeleteFromFavorite(item?.id)
                                    }
                                />
                            </p>
                        </td>
                    )}
                </tr>
            )}
        </>
    );
};

export default SongItem;
