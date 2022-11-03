import { FC, memo, useCallback, useContext, useEffect } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { Song } from '../../context/PlayerContext';
import PlayerItem from './PlayerItem';

interface PlayerListProps {
    songIds: Song[];
    setCurrentIndex: Function;
}

const PlayerList: FC<PlayerListProps> = ({ songIds, setCurrentIndex }) => {
    const setCurrentIndexMemo = useCallback(
        (index: number) => setCurrentIndex(index),
        []
    );

    const { currentIndex } = useContext(PlayerContext);

    useEffect(() => {
        const songRef = document.querySelector(`.song-${currentIndex}`);
        if (songRef) {
            songRef.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [currentIndex]);

    return (
        <div className='absolute top-0 w-full bg-slate-50 h-full overflow-auto scroll-none px-1'>
            <h1 className='font-semibold mb-2'>Danh sách phát</h1>
            {songIds.map((item, index) => (
                <PlayerItem
                    artists={item.artists.map((item) => item.name).join(', ')}
                    setCurrentIndex={setCurrentIndexMemo}
                    key={item.key}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    index={index}
                />
            ))}
        </div>
    );
};

export default memo(PlayerList);
