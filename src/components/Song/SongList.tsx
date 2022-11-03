import { useContext } from 'react';
import { ISong } from '../../models';
import SongItem from './SongItem';
import SongLabel from './SongLabel';
import { PlayerContext } from '../../context/PlayerContext';

const SongList = ({ songs }: { songs: ISong[] }) => {
    const { setSongIds, setCurrentIndex } = useContext(PlayerContext);

    const handleClick = (index: number) => {
        setCurrentIndex(index);
        setSongIds(songs);
    };

    return (
        <table className='table-auto w-full song-table border-separate border-spacing-y-1 opacity-90 mt-[16px]'>
            <thead>
                <SongLabel />
            </thead>
            <tbody>
                {songs.map((item, index) => (
                    <SongItem
                        onClick={handleClick}
                        item={item}
                        key={item.key}
                        index={index}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default SongList;
