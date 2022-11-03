import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Error from './components/Common/Error';
import MainLayout from './layout/MainLayout';
import PlaylistsDetail from './pages/Detail/PlaylistsDetail';
import SongDetails from './pages/Detail/SongDetail';
import Artists from './pages/Explore/Artists';
import Playlists from './pages/Explore/Playlists';
import Songs from './pages/Explore/Songs';
import Videos from './pages/Explore/Videos';
import Home from './pages/Home';
import Top100 from './pages/ListenToday/Top100';
import Topics from './pages/ListenToday/Topics';
import Search from './pages/Search';
import Result from './pages/Search/Result';

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.search, location.pathname]);

    return (
        <MainLayout>
            <div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/song' element={<Songs />} />
                    <Route path='/playlist' element={<Playlists />} />
                    <Route path='/video' element={<Videos />} />
                    <Route path='/artist' element={<Artists />} />
                    <Route path='/topics' element={<Topics />} />
                    <Route path='/top100' element={<Top100 />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/results' element={<Result />} />
                    <Route
                        path='/playlist/:key'
                        element={<PlaylistsDetail />}
                    />
                    <Route path='/song/:key' element={<SongDetails />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </div>
        </MainLayout>
    );
}

export default App;
