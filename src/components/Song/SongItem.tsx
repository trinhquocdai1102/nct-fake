import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ISong } from '../../models';
import { imgNotFound } from '../../utils/constants';

interface SongItemProps {
    item: ISong;
    index: number;
    onClick: (index: number) => void;
}

const SongItem: FC<SongItemProps> = ({ item, onClick, index }) => {
    return (
        <tr
            className='p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer h-[40px]'
            onClick={() => onClick(index)}
        >
            <td>
                <div className='flex gap-[8px] truncate'>
                    <div className='w-[20px] h-[20px]'>
                        <LazyLoadImage
                            src={item.thumbnail || imgNotFound}
                            alt={item.title}
                            width='100%'
                            height='100%'
                            className='rounded-md'
                            effect='blur'
                        />
                    </div>
                    <p className='line-clamp-1 text-sm'>{item.title}</p>
                </div>
            </td>
            <td>
                <p className='text-gray-400 text-13px tracking-wider'>
                    {item.artists.map((item) => item.name).join(', ')}
                </p>
            </td>
            <td>
                <p className='text-gray-400 text-13px tracking-wider'>
                    {item.duration}
                </p>
            </td>
        </tr>
    );
};

export default SongItem;
