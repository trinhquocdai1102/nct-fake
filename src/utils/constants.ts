export const imgNotFound =
    'https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png';

export const img404 = 'https://i.imgur.com/oRBZxTV.png';

export const formatTime = (seconds: number) => {
    try {
        const date = new Date(0);
        date.setSeconds(seconds);
        const time = date.toISOString().slice(11, 19);
        const result = time.startsWith('00:0')
            ? time.slice(4)
            : time.startsWith('00')
            ? time.slice(3)
            : time.length === 8 && time.startsWith('0')
            ? time.slice(1)
            : time;
        return result;
    } catch (error) {
        return '0:00';
    }
};