import { FC, memo, useRef, useState, useEffect } from 'react';
import { AiOutlinePause } from 'react-icons/ai';
import {
    BsFillPlayFill,
    BsFillSkipBackwardFill,
    BsFillSkipForwardFill,
    BsLink45Deg,
    BsHeart,
} from 'react-icons/bs';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaRandom } from 'react-icons/fa';
import { TfiLoop } from 'react-icons/tfi';
import { formatTime } from '../../utils/constants';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi';
import Loading from '../Common/Loading';

interface PlayLoop {
    loop: string;
    color: string;
}

interface PlayerControllerProps {
    toggleListSong: () => void;
    showListSong: boolean;
    volume: number;
    handleVolumeChange: (e: any) => void;
    currentTime: number;
    progressRef: any;
    audioRef: any;
    handleSeekTime: (e: any) => void;
    duration: number;
    handlePrevSong: () => void;
    handlePlayPause: () => void;
    playing: boolean;
    handleNextSong: () => void;
    setVolume: Function;
    loading: boolean;
    playRandom: boolean;
    playLoop: PlayLoop;
    handlePlayRandom: () => void;
    handlePlayLoop: () => void;
    handleAddToFavorite: () => void;
}

const PlayerController: FC<PlayerControllerProps> = ({
    volume,
    toggleListSong,
    showListSong,
    handleVolumeChange,
    currentTime,
    progressRef,
    audioRef,
    handleNextSong,
    handlePlayPause,
    handlePrevSong,
    handleSeekTime,
    playing,
    duration,
    setVolume,
    loading,
    playRandom,
    playLoop,
    handlePlayRandom,
    handlePlayLoop,
    handleAddToFavorite,
}) => {
    const [moreOption, setMoreOption] = useState(false);
    const volumeRef = useRef(0);
    const optionRef = useRef<any>();

    const handleCopy = (e: any) => {
        const href = e.target.href;
        navigator.clipboard.writeText(href);
        toast.success('Đã sao chép thành công');
    };

    const handleOpenMoreOption = () => {
        if (!moreOption) {
            setMoreOption(true);
        } else if (moreOption) {
            setMoreOption(false);
        }
    };

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

    return (
        <div className='pb-5'>
            <div className='flex items-center justify-between relative'>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (Number(volume) === 0) {
                            if (volumeRef.current) {
                                setVolume(volumeRef.current);
                            }
                        } else {
                            volumeRef.current = volume;
                            setVolume(0);
                        }
                    }}
                    className='cursor-pointer volume-icon'
                >
                    {Number(volume) === 0 ? (
                        <FiVolumeX className='lg:w-5 lg:h-5 w-6 h-6 text-gray-500' />
                    ) : Number(volume) < 50 ? (
                        <FiVolume1 className='lg:w-5 lg:h-5 w-6 h-6 text-gray-500' />
                    ) : (
                        <FiVolume2 className='lg:w-5 lg:h-5 w-6 h-6 text-gray-500' />
                    )}

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='volume-control bg-white absolute left-[-72px] top-[-92px] shadow-main items-center justify-center p-4 rounded-[18px] rotate-[-90deg] border'
                    >
                        <input
                            id='slider'
                            value={volume}
                            onChange={(e) => handleVolumeChange(e)}
                            type='range'
                            className='slider h-[2px]'
                        />
                    </div>
                </div>
                <button
                    onClick={() => toggleListSong()}
                    className='bg-[rgba(28,30,32,0.02)] px-6 py-2 rounded-full text-13px text-gray-400'
                >
                    {showListSong ? 'Đang phát' : 'Danh sách phát'}
                </button>
                <button
                    className='line hover:bg-third-color rounded-full p-2 text-main-color'
                    ref={optionRef}
                    onClick={handleOpenMoreOption}
                >
                    <BiDotsVerticalRounded />
                    <div
                        ref={optionRef}
                        className={`absolute flex-col w-[166px] left-[-124px] top-[-80px] bg-white shadow-main rounded-sm ${
                            moreOption ? 'flex' : 'hidden'
                        }`}
                    >
                        <div className='bg-third-color px-2'>
                            <div>
                                <Link
                                    to='#'
                                    className='flex items-center gap-1 py-3 text-13px cursor-pointer'
                                    onClick={(e) => handleCopy(e)}
                                >
                                    <span>
                                        <BsLink45Deg />
                                    </span>
                                    Sao chép link
                                </Link>
                            </div>
                            <div>
                                <Link
                                    to='#'
                                    className='flex items-center gap-1 py-2 text-13px cursor-pointer'
                                    onClick={handleAddToFavorite}
                                >
                                    <span>
                                        <BsHeart />
                                    </span>
                                    Thêm vào DS yêu thích
                                </Link>
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div className='mt-8'>
                <div className='flex items-center justify-between text-gray-400 text-[11px] font-normal'>
                    <p style={{ userSelect: 'none' }}>
                        {formatTime(currentTime)}
                    </p>
                    <div
                        className='flex-1 py-2 mx-[10px] cursor-pointer'
                        ref={progressRef}
                        onClick={handleSeekTime}
                    >
                        <div className='w-full bg-gray-300 h-[3px] relative'>
                            <p
                                style={{
                                    width: `${
                                        (currentTime * 100) /
                                            audioRef?.current?.duration || 0
                                    }%`,
                                }}
                                className='absolute top-0 bottom-0 bg-blue-500'
                            ></p>
                        </div>
                    </div>
                    <p style={{ userSelect: 'none' }}>{formatTime(duration)}</p>
                </div>

                <div className='flex items-center justify-between mt-5 text-[rgba(28,30,32,0.5)]'>
                    <div
                        className={`flex items-center cursor-pointer text-[15px] ${
                            playRandom ? 'text-second-color' : ''
                        }`}
                        title='Ngẫu nhiên'
                        onClick={handlePlayRandom}
                    >
                        <FaRandom />
                    </div>
                    <div
                        className='flex items-center cursor-pointer'
                        title='Bài trước'
                    >
                        <BsFillSkipBackwardFill
                            onClick={handlePrevSong}
                            className='w-5 h-5'
                        />
                    </div>
                    {!loading ? (
                        <div
                            onClick={handlePlayPause}
                            className='cursor-pointer'
                        >
                            {playing && duration > 0 ? (
                                <div title='Tạm dừng'>
                                    <AiOutlinePause className='w-10 h-12' />
                                </div>
                            ) : (
                                <div title='Phát'>
                                    <BsFillPlayFill className='w-12 h-12' />
                                </div>
                            )}
                        </div>
                    ) : (
                        <Loading />
                    )}

                    <div
                        className='flex items-center cursor-pointer'
                        title='Bài sau'
                    >
                        <BsFillSkipForwardFill
                            onClick={handleNextSong}
                            className='w-5 h-5'
                        />
                    </div>
                    <div
                        className={`flex line items-center cursor-pointer text-[16px] text-${playLoop.color}`}
                        title='Lặp lại'
                        onClick={handlePlayLoop}
                    >
                        <TfiLoop />
                        {playLoop.loop === '1' && (
                            <div className='absolute text-[6px] w-full flex justify-center font-bold'>
                                {playLoop.loop}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(PlayerController);
