/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'main-color': 'var(--main-color)',
                'second-color': 'var(--second-color)',
                'third-color': 'var(--third-color)',
                'bg-color': 'var(--bg)',
            },
            backgroundImage: {
                'song-ranking-vn':
                    "url('https://stc-id.nixcdn.com/v12/static/media/bg_top_1.03d0fd3f.jpg')",
                'song-ranking-us':
                    "url('https://stc-id.nixcdn.com/v12/static/media/bg_top_2.9eb21c0e.jpg')",
                'song-ranking-kr':
                    "url('https://stc-id.nixcdn.com/v12/static/media/bg_top_3.a057d449.jpg')",
            },
        },
        fontSize: {
            '13px': ['13px', '19px'],
            sm: ['14px', '20px'],
        },
        boxShadow: {
            main: '0 2px 4px rgba(0, 0, 0, 0.2)',
            '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        },
    },
    plugins: [],
};
