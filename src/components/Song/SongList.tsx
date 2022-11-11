import { FC, useContext } from 'react';
import SongItem from './SongItem';
import SongLabel from './SongLabel';
import { Song, SongPlayerContext } from '../../context/SongPlayerContext';

interface SongListProps {
    songs: Song[] | any;
    perRow?: number;
    handleDeleteFromFavorite?: (id: any) => void;
    type?: string;
}

const SongList: FC<SongListProps> = ({
    songs,
    perRow,
    handleDeleteFromFavorite,
    type,
}) => {
    const { setSongList, setCurrentIndex } = useContext(SongPlayerContext);

    const handleClick = (index: number) => {
        setCurrentIndex(index);
        setSongList(songs);
    };

    return (
        <>
            {perRow === 2 ? (
                <div className='grid md:grid-cols-2 grid-cols-1 gap-2 mb-5'>
                    {songs.map((item: any, index: any) => (
                        <SongItem
                            onClick={handleClick}
                            item={item}
                            key={item.key}
                            index={index}
                            perRow={perRow}
                        />
                    ))}
                </div>
            ) : (
                <table className='table-auto w-full song-table border-separate border-spacing-y-1 opacity-90 mt-[16px]'>
                    <thead>
                        <SongLabel type={type} />
                    </thead>
                    <tbody>
                        {songs.map((item: any, index: any) => (
                            <SongItem
                                onClick={handleClick}
                                item={item}
                                key={item.key}
                                index={index}
                                handleDeleteFromFavorite={
                                    handleDeleteFromFavorite
                                }
                                type={type}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default SongList;
