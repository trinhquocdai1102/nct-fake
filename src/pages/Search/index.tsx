import React, { FormEvent, useState } from 'react';
import { BsSearch, BsTrash } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import useSWR from 'swr';
import { getTopKeyword } from '../../apis/search';
import Error from '../../components/Common/Error';
import { getTrendingArtists } from '../../apis/artist';
import Trending from '../../components/Search/Trending';
import { Link, useNavigate } from 'react-router-dom';
import SearchSkeleton from '../../components/Skeleton/SearchSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { addHistorySearch, deleteHistorySearch } from '../../store/menuSlice';
import { v4 as uuidv4 } from 'uuid';

const Search = () => {
    const { data, error } = useSWR('top-keyword', getTopKeyword);
    const dispatch = useDispatch();
    const historySearch = useSelector((state: any) => state.menu);
    const { data: trendingArtists, error: errorTrendingArtists } = useSWR(
        'trending-artist',
        getTrendingArtists
    );

    const [textSearch, setTextSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!textSearch.trim()) return;
        else {
            navigate(`/results?q=${encodeURIComponent(textSearch)}`);
            if (historySearch.find((item: any) => item.name === textSearch))
                return null;
            else {
                dispatch(addHistorySearch({ id: uuidv4(), name: textSearch }));
            }
        }
    };

    const handleDeleteHistorySearch = (id: any) => {
        dispatch(deleteHistorySearch({ id: id }));
    };

    if (error || errorTrendingArtists) {
        return <Error />;
    }

    return (
        <div className='px-4'>
            <div>
                <form
                    onSubmit={handleSearch}
                    className='flex items-center rounded-sm w-full bg-gray-200 px-4 w-[80%] mim-w-[200px] max-w-[600px] focus:outline-[blue]'
                >
                    <BsSearch className='w-3 h-3 cursor-pointer text-main-color' />
                    <input
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                        className='flex-1 py-2 px-4 outline-none bg-transparent w-full'
                        placeholder='Tìm kiếm...'
                    />
                    <IoClose
                        className='cursor-pointer hover:opacity-50 text-main-color text-[20px]'
                        onClick={() => setTextSearch('')}
                    />
                </form>

                {!data ? (
                    <SearchSkeleton />
                ) : (
                    <>
                        <div className='mt-5'>
                            <h1 className='mb-5 font-semibold text-[20px]'>
                                Từ Khóa Hàng Đầu
                            </h1>
                            <div className='flex items-center flex-wrap gap-2'>
                                {data?.topkeyword?.map((item: any) => (
                                    <Trending
                                        position={item.order}
                                        key={item.order}
                                        name={item.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='mt-5'>
                            <h1 className='mb-5 font-semibold text-[20px]'>
                                Nghệ Sĩ Nổi Bật
                            </h1>
                            <div className='flex items-center flex-wrap gap-2'>
                                {trendingArtists?.artistTrending?.map(
                                    (item: any) => (
                                        <Trending
                                            position={item.position}
                                            key={item.position}
                                            name={item.name}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        <div className='mt-5'>
                            <h1 className='mb-5 font-semibold text-[20px]'>
                                Lịch sử tìm kiếm
                            </h1>
                            <div className='flex flex-col items-center gap-2'>
                                {historySearch.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className='bg-gray-200 py-1 pl-2 flex items-center justify-between rounded-sm cursor-pointer hover:text-second-color text-main-color w-full h-[36px]'
                                    >
                                        <Link to={`/results?q=${item.name}`}>
                                            <p className='text-sm font-normal ml-1'>
                                                {item.name}
                                            </p>
                                        </Link>
                                        <div
                                            className='w-[36px] h-[36px] flex justify-center items-center hover:bg-third-color rounded-sm'
                                            onClick={() =>
                                                handleDeleteHistorySearch(
                                                    item.id
                                                )
                                            }
                                        >
                                            <BsTrash className='text-main-color' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Search;
