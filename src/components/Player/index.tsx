import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import useSWR from 'swr';
import PlayerThumb from './PlayerThumb';
import { PlayerContext, Song } from '../../context/PlayerContext';
import { getSong } from '../../apis/song';
import { toast } from 'react-hot-toast';
import PlayerController from './PlayerController';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../../store/playerSlice';

const Player = () => {
    const dispatch = useDispatch();
    const { songIds, currentIndex, setCurrentIndex } =
        useContext(PlayerContext);
    const songKey = songIds && songIds[currentIndex]?.key;
    const { data } = useSWR(
        `player-${songKey}`,
        () => {
            if (songIds && songKey) {
                return getSong(songKey);
            }
        },
        {}
    );

    const favorList = useSelector((state: any) => state.players);
    const [playing, setPlaying] = useState(false);
    const [loading, _setLoading] = useState(false);
    const [playRandom, setPlayRandom] = useState(false);
    const [playLoop, setPlayLoop] = useState({
        color: 'second-color',
        loop: 'all',
    });
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showListSong, setShowListSong] = useState(false);
    const [volume, setVolume] = useState(
        Number(JSON.parse(localStorage.getItem('nct-current-volume') as any)) ||
            100
    );

    const audioRef = useRef<any>();
    const progressRef = useRef<any>();

    const handlePlayPause = useCallback(() => {
        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            audioRef.current.play();
            setPlaying(true);
        }
    }, [playing]);

    const handleAudioUpdate = () => {
        if (!audioRef.current) {
            return;
        }
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleVolumeChange = useCallback((e: any) => {
        setVolume(e.target.value);
    }, []);

    const handleAddToFavorite = () => {
        if (favorList.find((item: Song) => item.key === data?.song?.key)) {
            toast.error('Bài hát đã có trong DS yêu thích');
            return null;
        } else {
            dispatch(
                addFavorite({
                    key: data?.song?.key,
                    thumbnail: data?.song?.thumbnail,
                    title: data?.song?.title,
                    artists: data?.song?.artists
                        ?.map((item: any) => item.name)
                        .join(', '),
                })
            );
        }
    };

    const handleAudioEnded = () => {
        if (playLoop.loop === 'all') {
            if (songIds.length > 1) {
                handleNextSong();
            } else {
                audioRef.current.play();
            }
        } else if (playLoop.loop === '1') {
            setPlaying(true);
            audioRef.current.play();
            setCurrentTime(0);
        } else {
            audioRef.current.pause();
            setPlaying(false);
        }
    };

    const handleNextSong = () => {
        if (!playRandom) {
            setCurrentIndex((prev: number) => {
                if (prev >= songIds.length - 1) {
                    return 0;
                }
                return prev + 1;
            });
        } else {
            setCurrentIndex(() => {
                const randomNum = Math.floor(
                    Math.random() * songIds.length - 1
                );

                return randomNum;
            });
        }
    };

    const handlePrevSong = () => {
        if (!playRandom) {
            setCurrentIndex((prev: number) => {
                if (prev <= 0) {
                    return songIds.length - 1;
                }

                return prev - 1;
            });
        } else {
            setCurrentIndex(() => {
                const randomNum = Math.floor(
                    Math.random() * songIds.length - 1
                );

                return randomNum;
            });
        }
    };

    const songMemo = useMemo(() => {
        return songIds;
    }, [songIds]);

    const setCurrentIndexMemo = useCallback(
        (index: number) => setCurrentIndex(index),
        []
    );

    const handlePlayRandom = () => {
        if (!playRandom) {
            setPlayRandom(true);
        } else {
            setPlayRandom(false);
        }
    };

    const handlePlayLoop = () => {
        if (playLoop.loop === '0') {
            setPlayLoop({ loop: '1', color: 'second-color' });
        } else if (playLoop.loop === '1') {
            setPlayLoop({ loop: 'all', color: 'second-color' });
        } else if (playLoop.loop === 'all') {
            setPlayLoop({ loop: '0', color: '' });
        }
    };

    const handleSeekTime = useCallback((e: any) => {
        const clientX = e.clientX;
        const left = progressRef.current?.getBoundingClientRect().left;
        const width = progressRef.current?.getBoundingClientRect().width;
        const max = width + left;
        const min = left;

        if (clientX >= max) {
            audioRef.current.currentTime = audioRef.current.duration;
            return setCurrentTime(audioRef.current.duration);
        }

        if (clientX <= min) {
            audioRef.current.currentTime = 0;
            return setCurrentTime(0);
        }

        if (clientX <= max && clientX >= min) {
            const percent = (clientX - left) / width;
            audioRef.current.currentTime = audioRef.current.duration * percent;
            setCurrentTime(audioRef.current.duration * percent);
        }
    }, []);

    const toggleListSong = useCallback(() => {
        setShowListSong((prev) => !prev);
    }, []);

    useEffect(() => {
        if (!audioRef.current || !songIds || !data?.song?.streamUrls) return;
        audioRef.current.src = data?.song?.streamUrls[0]?.streamUrl;
        audioRef.current.play();
    }, [songIds, data, songKey]);

    useEffect(() => {
        if (data?.song?.streamUrls?.length === 0) {
            toast.error('Không tìm thấy bài hát!');
            if (currentIndex === songIds.length - 1) {
                return;
            }
            return setCurrentIndex((prev: number) => prev + 1);
        }
    }, [data?.song?.streamUrls]);

    useEffect(() => {
        if (!audioRef.current) return;
        setDuration(audioRef?.current?.duration);
    }, [audioRef?.current?.duration, data]);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = Number(volume) / 100;
    }, [volume]);

    useEffect(() => {
        if (!data) {
            audioRef?.current?.pause();
        }
    }, [data]);

    useEffect(() => {
        localStorage.setItem('nct-current-list-song', JSON.stringify(songIds));
        localStorage.setItem('nct-current-index', JSON.stringify(currentIndex));
        localStorage.setItem('nct-current-volume', JSON.stringify(volume));
    }, [songIds, currentIndex, volume]);

    return (
        <div className='bg-white h-full'>
            <div className='flex flex-col justify-between h-full bg-slate-50'>
                <PlayerThumb
                    id={data?.song?.key}
                    thumbnail={data?.song?.thumbnail}
                    title={data?.song?.title}
                    artists={data?.song?.artists
                        ?.map((item: any) => item.name)
                        .join(', ')}
                    showListSong={showListSong}
                    setCurrentIndexMemo={setCurrentIndexMemo}
                    songMemo={songMemo}
                />
                <PlayerController
                    loading={loading}
                    setVolume={setVolume}
                    audioRef={audioRef}
                    progressRef={progressRef}
                    currentTime={currentTime}
                    duration={duration}
                    handleNextSong={handleNextSong}
                    handlePrevSong={handlePrevSong}
                    handleVolumeChange={handleVolumeChange}
                    handlePlayPause={handlePlayPause}
                    handleSeekTime={handleSeekTime}
                    playing={playing}
                    showListSong={showListSong}
                    volume={volume}
                    toggleListSong={toggleListSong}
                    playRandom={playRandom}
                    playLoop={playLoop}
                    handlePlayRandom={handlePlayRandom}
                    handlePlayLoop={handlePlayLoop}
                    handleAddToFavorite={handleAddToFavorite}
                />
                <audio
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={handleAudioEnded}
                    onTimeUpdate={handleAudioUpdate}
                    ref={audioRef}
                />
            </div>
        </div>
    );
};

export default Player;
