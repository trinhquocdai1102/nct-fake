import { AiFillHeart, AiOutlineHome } from 'react-icons/ai';
import { RiSearchLine } from 'react-icons/ri';
import { HiChartSquareBar } from 'react-icons/hi';
import { ImHeadphones, ImProfile } from 'react-icons/im';
import { FaRegCompass } from 'react-icons/fa';

export const sidebar = [
    {
        name: 'Tìm Kiếm',
        path: '/search',
        icon: RiSearchLine,
        child: null,
        background: '#2ecc71',
    },
    {
        name: 'Trang Chủ',
        path: '/',
        icon: AiOutlineHome,
        child: null,
        background: '#3498db',
    },
    {
        name: 'Khám Phá',
        path: null,
        icon: FaRegCompass,
        child: [
            {
                name: 'Bài Hát',
                path: '/song',
            },
            {
                name: 'Playlist',
                path: '/playlist',
            },
            {
                name: 'Video',
                path: '/video',
            },
            {
                name: 'Nghệ Sĩ',
                path: '/artist',
            },
        ],
        background: '#f1c40f',
    },
    {
        name: 'Nghe gì hôm nay',
        path: null,
        icon: ImHeadphones,
        background: '#9b59b6',
        child: [
            {
                name: 'Chủ đề',
                path: '/topic',
            },
            {
                name: 'Tuyển tập',
                path: '/playlist/tags',
            },
            {
                name: 'Top 100',
                path: '/top100',
            },
        ],
    },
    {
        name: 'BXH NCT',
        path: '/ranking',
        icon: HiChartSquareBar,
        child: null,
        background: '#e67e22',
    },
    {
        name: 'Music 4U',
        path: '/4U',
        icon: AiFillHeart,
        child: null,
        background: '#13F8E5',
    },
];
