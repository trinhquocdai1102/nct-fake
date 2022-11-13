import React, { FC, useContext, useEffect } from 'react';
import { AiOutlineMenu, AiOutlinePause } from 'react-icons/ai';
import { BsFillPlayFill, BsSkipForwardFill } from 'react-icons/bs';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { IoPlay } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Login from '../components/Login';
import SongPlayer from '../components/Player/Song';
import VideoList from '../components/Player/Video/VideoList';
import Register from '../components/Register';
import Sidebar from '../components/Sidebar/Sidebar';
import { AuthContext } from '../context/AuthContext';
import { CommonContext } from '../context/CommonContext';
import { SongPlayerContext } from '../context/SongPlayerContext';
import { VideoPlayerContext } from '../context/VideoPlayerContext';
import useInnerWidth from '../hooks/useInnerWidth';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const widthLayout = { sidebarWidth: 200, playerWidth: 300 };
    const { isPC, isLaptop, isTablet } = useInnerWidth();
    const { openFormLogin, openFormRegister } = useContext(AuthContext);
    const {
        playerRef,
        openPlayer,
        setOpenPlayer,
        mobilePlayerRef,
        mobileControlPlayerRef,
        sidebarRef,
        openSidebar,
        setOpenSidebar,
    } = useContext(CommonContext);
    const {
        audioPlaying,
        songList,
        currentIndex,
        setCurrentIndex,
        handlePlayPause,
    } = useContext(SongPlayerContext);
    const { videoMode, setVideoMode, allVideo } =
        useContext(VideoPlayerContext);
    const location = useLocation();

    const handleNextSong = () => {
        setCurrentIndex((prev: number) => {
            if (prev <= 0) {
                return songList.length - 1;
            }
            return prev - 1;
        });
    };

    useEffect(() => {
        const handler = (e: { target: any }) => {
            if (!playerRef?.current?.contains(e.target)) {
                setOpenPlayer(false);
            }
            if (
                !mobilePlayerRef?.current?.contains(e.target) &&
                mobileControlPlayerRef?.current?.contains(e.target)
            ) {
                setOpenPlayer(true);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    useEffect(() => {
        const handler = (e: { target: any }) => {
            if (!sidebarRef?.current?.contains(e.target)) {
                setOpenSidebar(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    useEffect(() => {
        if (
            location.pathname.includes('/video/') &&
            location.key !== 'default'
        ) {
            setVideoMode(true);
        } else {
            setVideoMode(false);
        }
    }, [location]);

    return (
        <div className='bg-slate-50'>
            {!isTablet && (
                <div className='flex items-center justify-between py-4 px-4 text-[28px] border-b'>
                    <div>
                        <AiOutlineMenu
                            className='cursor-pointer'
                            onClick={() => setOpenSidebar(true)}
                        />
                    </div>
                    <div>
                        <IoPlay
                            className='cursor-pointer'
                            onClick={() => setOpenPlayer(true)}
                        />
                    </div>
                </div>
            )}
            <div className='flex w-full overflow-auto'>
                <div
                    style={{
                        left: isTablet ? '0' : openSidebar ? '0px' : '-200px',
                        transition: 'all linear 0.3s',
                    }}
                    ref={sidebarRef}
                    className='w-[200px] max-w-full z-[99] h-screen pt-5 border-r border-third-color fixed top-0 bottom-0 left-0 bg-white'
                >
                    <Sidebar />
                </div>
                <div
                    className='relative'
                    style={{
                        width: isPC
                            ? `calc(100% - ${
                                  widthLayout.sidebarWidth +
                                  widthLayout.playerWidth
                              }px)`
                            : isLaptop
                            ? `calc(100% - ${widthLayout.sidebarWidth}px)`
                            : '100%',
                        marginLeft: isTablet
                            ? `${widthLayout.sidebarWidth}px`
                            : 0,
                        marginRight: isPC ? `${widthLayout.playerWidth}px` : 0,
                    }}
                >
                    <div className='min-h-screen py-4 lg:mt-0'>{children}</div>
                    <div
                        style={{
                            right: isPC ? '0px' : openPlayer ? '0px' : '-100%',
                            transition: 'all linear 0.3s',
                        }}
                        ref={playerRef}
                        className={`scroll-none overflow-y-scroll md:w-[300px] w-full max-w-full border-l border-r-third-color px-4 h-screen pt-4 fixed top-0 bottom-0 bg-slate-50 z-[999]`}
                    >
                        {videoMode ? (
                            <VideoList videos={allVideo} />
                        ) : (
                            <SongPlayer />
                        )}
                    </div>
                    {!isPC && !openPlayer && !videoMode && (
                        <div className='fixed right-[16px] bottom-[28px] z-[999] rounded-md'>
                            <div className='bg-white p-2 show-item'>
                                <div
                                    className='flex items-center cursor-pointer'
                                    ref={mobileControlPlayerRef}
                                >
                                    <p
                                        className='text-sm font-medium truncate max-w-[200px]'
                                        title={
                                            songList.find(
                                                (_item, index) =>
                                                    index === currentIndex
                                            )?.title
                                        }
                                    >
                                        {
                                            songList.find(
                                                (_item, index) =>
                                                    index === currentIndex
                                            )?.title
                                        }
                                    </p>
                                    <p className='mx-1'>-</p>
                                    <p
                                        className='truncate max-w-[60px] text-xs text-main-color'
                                        title={songList
                                            .find(
                                                (_item, index) =>
                                                    index === currentIndex
                                            )
                                            ?.artists?.map((item) => item.name)
                                            .join(', ')}
                                    >
                                        {songList
                                            .find(
                                                (_item, index) =>
                                                    index === currentIndex
                                            )
                                            ?.artists?.map((item) => item.name)
                                            .join(', ')}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between text-main-color'>
                                    <div
                                        className='flex items-center gap-2'
                                        ref={mobilePlayerRef}
                                    >
                                        <div
                                            onClick={handlePlayPause}
                                            className='cursor-pointer'
                                        >
                                            {audioPlaying ? (
                                                <div title='Tạm dừng'>
                                                    <AiOutlinePause className='w-6 h-8' />
                                                </div>
                                            ) : (
                                                <div title='Phát'>
                                                    <BsFillPlayFill className='w-6 h-8' />
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            onClick={handleNextSong}
                                            title='Bài kế tiếp'
                                        >
                                            <BsSkipForwardFill className='text-lg cursor-pointer' />
                                        </div>
                                    </div>
                                    <div onClick={() => setOpenPlayer(true)}>
                                        <HiOutlineChevronLeft className='text-[26px] cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <Footer />
                </div>
            </div>
            {openFormLogin && <Login />}
            {openFormRegister && <Register />}
        </div>
    );
};

export default MainLayout;
