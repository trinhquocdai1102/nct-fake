import React, { FC, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Item from './Item';
import useInnerWidth from '../../hooks/useInnerWidth';

interface BannerProps {
    banners: any[];
    spacer?: number;
    autoPlay?: boolean;
    type?: string;
    radio?: string;
}

const Slider: FC<BannerProps> = ({
    banners,
    spacer = 20,
    autoPlay = false,
    type,
    radio = '1/1',
}) => {
    const { isPC, isTablet } = useInnerWidth();

    const views = useMemo(() => {
        if (isPC) {
            return 6;
        } else if (isTablet) {
            return 4;
        } else {
            return 2;
        }
    }, [isPC, isTablet]);

    return (
        <Swiper
            autoplay={autoPlay}
            navigation
            modules={[Navigation, Autoplay]}
            spaceBetween={spacer}
            slidesPerView={views}
        >
            {banners?.map((item) => (
                <SwiperSlide key={item.key}>
                    <Item radio={radio} item={item} type={type} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
