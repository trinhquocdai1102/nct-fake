import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider as StoreProvider } from 'react-redux';
import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import SongPlayerContextProvider from './context/SongPlayerContext';
import store from './store';
import { AuthContextProvider } from './context/AuthContext';
import { VideoPlayerContextProvider } from './context/VideoPlayerContext';
import { CommonContextProvider } from './context/CommonContext';
import { ProfileContextProvider } from './context/ProfileContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <StoreProvider store={store}>
            <AuthContextProvider>
                <VideoPlayerContextProvider>
                    <SongPlayerContextProvider>
                        <CommonContextProvider>
                            <ProfileContextProvider>
                                <SWRConfig value={{ revalidateOnFocus: false }}>
                                    <App />
                                    <Toaster reverseOrder={false} />
                                </SWRConfig>
                            </ProfileContextProvider>
                        </CommonContextProvider>
                    </SongPlayerContextProvider>
                </VideoPlayerContextProvider>
            </AuthContextProvider>
        </StoreProvider>
    </BrowserRouter>
);
