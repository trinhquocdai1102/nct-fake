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
import { SongPlayerContext } from '../../../context/SongPlayerContext';
import { getSong } from '../../../apis/song';
import { toast } from 'react-hot-toast';
import PlayerController from './PlayerController';
import { VideoPlayerContext } from '../../../context/VideoPlayerContext';
import { AuthContext } from '../../../context/AuthContext';
import { addDoc } from 'firebase/firestore';
import { addMusicFromLocal } from '../../../utils/history';

const SongPlayer = () => {
    const {
        audioRef,
        audioPlaying,
        setAudioPlaying,
        songList,
        currentIndex,
        setCurrentIndex,
        favoriteCollection,
        favoriteList,
        handlePlayPause,
    } = useContext(SongPlayerContext);
    const { setOpenFormLogin, isLogged } = useContext(AuthContext);

    const { videoPlaying } = useContext(VideoPlayerContext);
    const songKey = songList && songList[currentIndex]?.key;
    const { data } = useSWR(
        `player-${songKey}`,
        () => {
            if (songList && songKey) {
                return getSong(songKey);
            }
        },
        {}
    );
    const [loading, _setLoading] = useState(false);
    const [moreOption, setMoreOption] = useState(false);
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

    const optionRef = useRef<HTMLDivElement | any>();
    const progressRef = useRef<HTMLDivElement | any>();

    const handleAudioUpdate = () => {
        if (!audioRef.current) {
            return;
        }
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleVolumeChange = useCallback((e: any) => {
        setVolume(e.target.value);
    }, []);

    const handleAddToFavorite = async () => {
        const checkExist = favoriteList?.find(
            (item: any) =>
                item?.key === data?.song?.key && item?.user === isLogged?.email
        );

        if (!isLogged) {
            setOpenFormLogin(true);
        } else if (isLogged && checkExist) {
            toast.error('Bài hát đã có trong DS yêu thích');
            return null;
        } else {
            if (data?.song) {
                await addDoc(favoriteCollection, {
                    ...data?.song,
                    user: isLogged.email,
                });
                toast.success('Đã thêm vào danh sách yêu thích');
            } else if (isLogged?.email === undefined) {
                toast.error('Đã xảy ra lỗi');
            } else {
                toast.error('Bài hát không tồn tại');
            }
        }
    };

    const handleAudioEnded = () => {
        if (playLoop.loop === 'all') {
            if (songList.length > 1) {
                handleNextSong();
            } else {
                audioRef.current.play();
            }
        } else if (playLoop.loop === '1') {
            setAudioPlaying(true);
            audioRef.current.play();
            setCurrentTime(0);
        } else {
            audioRef.current.pause();
            setAudioPlaying(false);
        }
    };

    const handleNextSong = () => {
        if (!playRandom) {
            setCurrentIndex((prev: number) => {
                if (prev >= songList.length - 1) {
                    return 0;
                }
                return prev + 1;
            });
        } else {
            setCurrentIndex(() => {
                const randomNum = Math.floor(
                    Math.random() * songList.length - 1
                );

                return randomNum;
            });
        }
    };

    const handlePrevSong = () => {
        if (!playRandom) {
            setCurrentIndex((prev: number) => {
                if (prev <= 0) {
                    return songList.length - 1;
                }

                return prev - 1;
            });
        } else {
            setCurrentIndex(() => {
                const randomNum = Math.floor(
                    Math.random() * songList.length - 1
                );

                return randomNum;
            });
        }
    };

    const songMemo = useMemo(() => {
        return songList;
    }, [songList]);

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

    const handleOpenMoreOption = () => {
        if (!moreOption) {
            setMoreOption(true);
        } else if (moreOption) {
            setMoreOption(false);
        }
    };

    useEffect(() => {
        if (
            !audioRef.current ||
            !songList ||
            !data?.song?.streamUrls ||
            videoPlaying === true
        )
            return;
        audioRef.current.src = data?.song?.streamUrls[0]?.streamUrl;
        audioRef.current.play();
    }, [songList, data, songKey]);

    useEffect(() => {
        if (data?.song?.streamUrls?.length === 0) {
            toast.error('Không tìm thấy bài hát!');
            if (currentIndex === songList.length - 1) {
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
        if (videoPlaying) {
            audioRef?.current?.pause();
        }
    }, [videoPlaying]);

    useEffect(() => {
        localStorage.setItem('nct-current-list-song', JSON.stringify(songList));
        localStorage.setItem('nct-current-index', JSON.stringify(currentIndex));
        localStorage.setItem('nct-current-volume', JSON.stringify(volume));
    }, [songList, currentIndex, volume]);

    useEffect(() => {
        const handler = (e: { target: any }) => {
            if (!optionRef.current.contains(e.target)) {
                setMoreOption(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    useEffect(() => {
        if (songList[currentIndex] && songList[currentIndex]?.key) {
            addMusicFromLocal(songList[currentIndex]);
        }
    }, [currentIndex]);

    return (
        <div className='bg-slate-50 h-full'>
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
                    optionRef={optionRef}
                    moreOption={moreOption}
                    handleNextSong={handleNextSong}
                    handlePrevSong={handlePrevSong}
                    handleVolumeChange={handleVolumeChange}
                    handlePlayPause={handlePlayPause}
                    handleSeekTime={handleSeekTime}
                    playing={audioPlaying}
                    showListSong={showListSong}
                    volume={volume}
                    toggleListSong={toggleListSong}
                    playRandom={playRandom}
                    playLoop={playLoop}
                    handlePlayRandom={handlePlayRandom}
                    handlePlayLoop={handlePlayLoop}
                    handleAddToFavorite={handleAddToFavorite}
                    handleOpenMoreOption={handleOpenMoreOption}
                />
                <audio
                    onPlay={() => setAudioPlaying(true)}
                    onPause={() => setAudioPlaying(false)}
                    onEnded={handleAudioEnded}
                    onTimeUpdate={handleAudioUpdate}
                    ref={audioRef}
                />
            </div>
        </div>
    );
};

export default SongPlayer;
