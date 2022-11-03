import { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import { imgNotFound } from '../../utils/constants';

interface ItemType {
    item: any;
    type?: string;
    radio?: string;
}

const Item = ({ item, type, radio = '1/1' }: ItemType) => {
    const { setSongIds } = useContext(PlayerContext);

    const handlePlaySong = () => {
        if (type !== 'songs') {
            return;
        }

        setSongIds(item.key);
    };

    return (
        <div onClick={handlePlaySong}>
            <Link
                to={
                    item.type
                        ? `/${item.type.toLowerCase()}/${item.key}`
                        : type
                        ? `/${type}/${item.key}`
                        : '#'
                }
                className={`block w-full rounded-md`}
                style={{ aspectRatio: radio }}
            >
                <LazyLoadImage
                    src={
                        item.imageUrl ||
                        item.thumbnail ||
                        item.thumbURL ||
                        imgNotFound
                    }
                    alt={item.title}
                    effect='blur'
                    width='100%'
                    height='100%'
                    className='rounded-md'
                />

                <p className='line-clamp-1 font-semibold text-13px'>
                    {item?.title}
                </p>
            </Link>
        </div>
    );
};

export default Item;
