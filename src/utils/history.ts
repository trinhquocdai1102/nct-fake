import { Song } from '../context/SongPlayerContext';

export const addMusicFromLocal = (song: Song): void => {
    let historyMusic: Song[] =
        JSON.parse(localStorage.getItem('nct-history') as string) || [];

    const exitsMusic = historyMusic.some((item) => item.key === song.key);

    if (exitsMusic) {
        historyMusic = historyMusic.filter((item) => item.key !== song.key);
    }

    historyMusic.unshift(song);
    localStorage.setItem('nct-history', JSON.stringify(historyMusic));
};

export const getMusicFromLocal = () => {
    let historyMusic: Song[] =
        JSON.parse(localStorage.getItem('nct-history') as string) || [];

    return historyMusic;
};

export const addHistorySearchFromLocal = (title: string): void => {
    let historySearch: string[] =
        JSON.parse(localStorage.getItem('nct-history-search') as string) || [];

    const exitsMusic = historySearch.some((item) => item === title);

    if (exitsMusic) {
        historySearch = historySearch.filter((item) => item !== title);
    }

    historySearch.unshift(title);
    localStorage.setItem('nct-history-search', JSON.stringify(historySearch));
};

export const getSearchHistoryFromLocal = () => {
    let historySearch: string[] =
        JSON.parse(localStorage.getItem('nct-history-search') as string) || [];

    return historySearch;
};
