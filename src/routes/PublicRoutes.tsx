import React from 'react';
import Error from '../components/Common/Error';
import ArtistDetail from '../pages/Detail/ArtistDetail';
import FavoriteDetail from '../pages/Detail/FavoriteDetail';
import PlaylistDetail from '../pages/Detail/PlaylistDetail';
import SongDetails from '../pages/Detail/SongDetail';
import TopicDetail from '../pages/Detail/TopicDetail';
import VideoDetail from '../pages/Detail/VideoDetail';
import Artists from '../pages/Explore/Artists';
import Playlists from '../pages/Explore/Playlists';
import Songs from '../pages/Explore/Songs';
import Videos from '../pages/Explore/Videos';
import Home from '../pages/Home';
import Collection from '../pages/ListenToday/Collection';
import Top100 from '../pages/ListenToday/Top100';
import Topics from '../pages/ListenToday/Topics';
import Music4U from '../pages/Music4U';
import Ranking from '../pages/Ranking';
import Search from '../pages/Search';
import Result from '../pages/Search/Result';

export const PublicRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/song',
        element: <Songs />,
    },
    {
        path: '/playlist',
        element: <Playlists />,
    },
    {
        path: '/video',
        element: <Videos />,
    },
    {
        path: '/artist',
        element: <Artists />,
    },
    {
        path: '/topic',
        element: <Topics />,
    },
    {
        path: '/top100',
        element: <Top100 />,
    },
    {
        path: '/ranking',
        element: <Ranking />,
    },
    {
        path: '/4U',
        element: <Music4U />,
    },
    {
        path: '/search',
        element: <Search />,
    },
    {
        path: '/results',
        element: <Result />,
    },
    {
        path: '/favorite/:key',
        element: <FavoriteDetail />,
    },
    {
        path: '/playlist/tags',
        element: <Collection />,
    },
    {
        path: '/playlist/:key',
        element: <PlaylistDetail />,
    },
    {
        path: '/song/:key',
        element: <SongDetails />,
    },
    {
        path: '/video/:key',
        element: <VideoDetail />,
    },
    {
        path: '/artist/:key',
        element: <ArtistDetail />,
    },
    {
        path: '/topic/:key',
        element: <TopicDetail />,
    },
    {
        path: '401',
        element: <p>No Authorization Found</p>,
    },
    {
        path: '*',
        element: <Error />,
    },
];
