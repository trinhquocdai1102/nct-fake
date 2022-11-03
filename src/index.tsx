import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import PlayerContextProvider from './context/PlayerContext';
import store from './store';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <AuthProvider>
        <BrowserRouter>
            <PlayerContextProvider>
                <SWRConfig value={{ revalidateOnFocus: false }}>
                    <Provider store={store}>
                        <App />
                        <Toaster reverseOrder={false} />
                    </Provider>
                </SWRConfig>
            </PlayerContextProvider>
        </BrowserRouter>
    </AuthProvider>
);
