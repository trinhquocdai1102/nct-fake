import React, {
    FC,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { VideoPlayerContext } from '../../../context/VideoPlayerContext';
import VideoPlaySkeleton from '../../Skeleton/VideoPlaySkeleton';
import VideoController from './VideoController';

interface VideoPlayerProps {
    data: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ data }) => {
    const { videoPlaying, setVideoPlaying, videoRef } =
        useContext(VideoPlayerContext);

    const progressRef = useRef<HTMLDivElement | any>();
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState(
        Number(
            JSON.parse(localStorage.getItem('nct-current-video-volume') as any)
        ) || 100
    );

    const handlePlayPause = useCallback(() => {
        if (videoPlaying) {
            videoRef.current.pause();
            setVideoPlaying(false);
        } else {
            videoRef.current.play();
            setVideoPlaying(true);
        }
    }, [videoPlaying]);

    const handleSeekTime = useCallback((e: any) => {
        const clientX = e.clientX;
        const left = progressRef.current?.getBoundingClientRect().left;
        const width = progressRef.current?.getBoundingClientRect().width;
        const max = width + left;
        const min = left;

        if (clientX >= max) {
            videoRef.current.currentTime = videoRef.current.duration;
            return setCurrentTime(videoRef.current.duration);
        }

        if (clientX <= min) {
            videoRef.current.currentTime = 0;
            return setCurrentTime(0);
        }

        if (clientX <= max && clientX >= min) {
            const percent = (clientX - left) / width;
            videoRef.current.currentTime = videoRef.current.duration * percent;
            setCurrentTime(videoRef.current.duration * percent);
        }
    }, []);

    const handleVideoUpdate = () => {
        if (!videoRef.current) {
            return;
        }
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleVolumeChange = useCallback((e: any) => {
        setVolume(e.target.value);
    }, []);

    useEffect(() => {
        if (!videoRef.current) return;
        setDuration(videoRef?.current?.duration);
    }, [videoRef?.current?.duration, data]);

    useEffect(() => {
        if (!videoRef.current) return;
        videoRef.current.volume = Number(volume) / 100;
    }, [volume]);

    useEffect(() => {
        if (!data) {
            videoRef?.current?.pause();
        }
    }, [data]);

    useEffect(() => {
        localStorage.setItem(
            'nct-current-video-volume',
            JSON.stringify(volume)
        );
    }, [volume]);

    return (
        <>
            {!data ? (
                <VideoPlaySkeleton />
            ) : (
                <div className='line'>
                    <video
                        className='w-full h-full rounded-sm'
                        src={data}
                        preload='metadata'
                        ref={videoRef}
                        controls={false}
                        onClick={handlePlayPause}
                        onTimeUpdate={handleVideoUpdate}
                    />
                    <VideoController
                        progressRef={progressRef}
                        handleSeekTime={handleSeekTime}
                        currentTime={currentTime}
                        videoRef={videoRef}
                        handlePlayPause={handlePlayPause}
                        videoPlaying={videoPlaying}
                        volume={volume}
                        setVolume={setVolume}
                        handleVolumeChange={handleVolumeChange}
                        duration={duration}
                    />
                </div>
            )}
        </>
    );
};

export default VideoPlayer;
