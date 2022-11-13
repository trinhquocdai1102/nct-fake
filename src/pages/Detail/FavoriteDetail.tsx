import { deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { getFavorite } from '../../apis/favorite';
import DetailSkeleton from '../../components/Skeleton/DetailSkeleton';
import SongList from '../../components/Song/SongList';
import { db } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import { SongPlayerContext } from '../../context/SongPlayerContext';
import { avatarDefault, favoriteImg, imgNotFound } from '../../utils/constants';

const FavoriteDetail = () => {
    const { isLogged } = useContext(AuthContext);
    const {
        setCurrentIndex,
        setSongList,
        favoriteCollection,
        setFavoriteList,
        favoriteList,
    } = useContext(SongPlayerContext);
    const allUser = useSelector((state: any) => state.auth);

    const favoriteListWithUserLogged = favoriteList?.filter(
        (item: any) => item?.user === isLogged?.email
    );

    const user =
        isLogged &&
        allUser?.find((item: any) => item?.email === isLogged?.email);

    const handlePlay = () => {
        if (favoriteList) {
            setCurrentIndex(0);
            setSongList(favoriteList);
        }
    };

    const handleDeleteFromFavorite = async (id: any) => {
        const docRef = doc(db, 'favorite', id);
        await deleteDoc(docRef);
    };

    useEffect(() => {
        const getData = async () => {
            const data: any = await getDocs(favoriteCollection);

            setFavoriteList(
                data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
            );
        };
        getData();
    }, [favoriteCollection]);

    return (
        <>
            {!favoriteListWithUserLogged ? (
                <DetailSkeleton />
            ) : (
                <div className='px-4'>
                    <div className='flex md:flex-row flex-col'>
                        <div className='flex items-center justify-center md:w-auto w-full'>
                            <div className='line w-[160px] h-auto max-w-full aspect-[1/1] rounded-md relative'>
                                <div className='w-[60%] h-[6px] ml-[20%] rounded-tl-[4px] rounded-tr-[4px] bg-third-color'></div>
                                <div className='w-[80%] h-[6px] ml-[10%] rounded-tl-[4px] rounded-tr-[4px] bg-[rgba(28,30,32,0.1)]'></div>
                                <LazyLoadImage
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = imgNotFound;
                                    }}
                                    src={favoriteImg ?? imgNotFound}
                                    alt='favorite'
                                    width='100%'
                                    height='100%'
                                    className='rounded-md'
                                    effect='blur'
                                />
                                <div
                                    className='absolute flex justify-center items-center bottom-[12px] cursor-pointer right-[4px]'
                                    title='Phát'
                                    onClick={handlePlay}
                                >
                                    <BsFillPlayCircleFill className='text-white text-[28px]' />
                                </div>
                            </div>
                        </div>

                        <div className='flex-1 md:ml-5 ml-0 md:mt-0 mt-5 text-13px '>
                            <div>
                                <p className=''>
                                    <span className='text-main-color mr-2'>
                                        Playlist:
                                    </span>
                                    <span className='text-base font-bold'>
                                        Bài hát yêu thích
                                    </span>
                                </p>
                            </div>
                            <div className='flex items-center mt-4 text-main-color'>
                                <p>
                                    {favoriteListWithUserLogged.length}
                                    <span className='ml-1'>bài hát</span>
                                </p>
                            </div>
                            <div className='w-full bg-bg-color mt-[40px] px-[24px] py-[12px] rounded-sm'>
                                <div className='flex gap-[8px] items-center'>
                                    <div className='w-[38px] h-[38px] rounded-full truncate text-main-color'>
                                        <img
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src =
                                                    avatarDefault;
                                            }}
                                            src={user?.avatar ?? avatarDefault}
                                            alt='uploadBy'
                                        />
                                    </div>
                                    <div>
                                        <span className='text-main-color text-13px mr-1'>
                                            Tạo bởi:
                                        </span>
                                        <p className='font-bold uppercase text-second-color text-sm'>
                                            {user?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-5 font-semibold text-[22px] leading-loose bg-[rgba(28,30,32,0.02)] px-4 pt-4'>
                        <h1>Danh sách bài hát</h1>

                        <SongList
                            songs={favoriteListWithUserLogged}
                            handleDeleteFromFavorite={handleDeleteFromFavorite}
                            type='favorite'
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default FavoriteDetail;
