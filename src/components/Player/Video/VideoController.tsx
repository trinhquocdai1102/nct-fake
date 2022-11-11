import React, { FC, useRef } from 'react';
import { BsSkipForwardFill } from 'react-icons/bs';
import { FiVolume1, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { IoPause, IoPlay } from 'react-icons/io5';
import { MdOutlineOpenInFull } from 'react-icons/md';
import { formatTime } from '../../../utils/constants';

interface VideoControllerProps {
    progressRef: any;
    handleSeekTime: (e: any) => void;
    currentTime: number;
    videoRef: HTMLDivElement | any;
    handlePlayPause: () => void;
    videoPlaying: boolean;
    volume: number;
    setVolume: Function;
    duration: number;
    handleVolumeChange: (e: any) => void;
}

const VideoController: FC<VideoControllerProps> = ({
    progressRef,
    handleSeekTime,
    currentTime,
    videoRef,
    handlePlayPause,
    videoPlaying,
    volume,
    setVolume,
    duration,
    handleVolumeChange,
}) => {
    const volumeRef = useRef(0);

    return (
        <div className='absolute bottom-0 bg-main-color text-white text-[24px] w-full pb-[8px]'>
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
                                    videoRef?.current?.duration || 0
                            }%`,
                        }}
                        className='absolute top-0 bottom-0 bg-blue-500'
                    ></p>
                </div>
            </div>
            <div className='mx-[20px] flex items-center justify-between'>
                <div className='flex items-center gap-6'>
                    <div onClick={handlePlayPause}>
                        {!videoPlaying ? (
                            <IoPlay className='cursor-pointer' />
                        ) : (
                            <IoPause className='cursor-pointer' />
                        )}
                    </div>
                    <div>
                        <BsSkipForwardFill className='text-lg cursor-pointer' />
                    </div>
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
                        className='cursor-pointer volume-icon flex items-center'
                    >
                        {Number(volume) === 0 ? (
                            <FiVolumeX className='lg:w-5 lg:h-5 w-6 h-6' />
                        ) : Number(volume) < 50 ? (
                            <FiVolume1 className='lg:w-5 lg:h-5 w-6 h-6' />
                        ) : (
                            <FiVolume2 className='lg:w-5 lg:h-5 w-6 h-6' />
                        )}

                        <div>
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className='volume-control ml-2'
                            >
                                <input
                                    id='slider'
                                    value={volume}
                                    onChange={(e) => handleVolumeChange(e)}
                                    type='range'
                                    className='slider video-volume h-[2px] w-[80px]'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center text-13px'>
                        <p style={{ userSelect: 'none' }}>
                            {formatTime(currentTime)}
                        </p>
                        <p className='mx-1'>/</p>
                        <p style={{ userSelect: 'none' }}>
                            {formatTime(duration)}
                        </p>
                    </div>
                </div>
                <div
                    className='line cursor-pointer'
                    onClick={() => {
                        videoRef.current.requestFullscreen();
                    }}
                >
                    <MdOutlineOpenInFull className='text-xl' />
                    <div className=' flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 w-full'>
                        <div className='w-[2px] h-[2px] bg-[transparent]'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoController;
