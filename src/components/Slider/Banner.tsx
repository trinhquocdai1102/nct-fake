import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { imgNotFound } from '../../utils/constants';

interface BannerProps {
    banners: any[];
}

const Banner: FC<BannerProps> = ({ banners }) => {
    return (
        <Swiper
            loop={true}
            autoplay
            navigation
            pagination
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            className='banner'
        >
            {banners?.map((item) => (
                <SwiperSlide key={item.key}>
                    <Link
                        className='w-full aspect-auto rounded-md overflow-hidden'
                        to={`song/${item.key}`}
                    >
                        <LazyLoadImage
                            className='rounded-md'
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = imgNotFound;
                            }}
                            src={
                                (item.coverImageURL ||
                                    item.imageUrl ||
                                    item.thumbnail ||
                                    item.thumbURL) ??
                                imgNotFound
                            }
                            alt={item.title}
                            effect={'blur'}
                        />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Banner;
