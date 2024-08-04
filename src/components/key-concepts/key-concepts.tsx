'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Box } from '@mui/material';
import { Autoplay, Navigation } from 'swiper/modules';

import Card from './card/card';
import { data } from './data';

export default function KeyConcepts(): React.JSX.Element {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <Box
      sx={{
        backgroundImage: `url(/assets/DotsBackground.png)`,
        padding: '128px 256px',
        '@media (max-width: 1500px)': {
          padding: '128px 128px',
        },
        '@media (max-width: 1200px)': {
          padding: '90px 128px',
        },
        '@media (max-width: 1000px)': {
          padding: '80px 64px',
        },
        '@media (max-width: 760px)': {
          padding: '50px 24px',
        },
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      ref={ref}
    >
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        modules={[Navigation, Autoplay]}
        loop
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="mySwiper"
        breakpoints={{
          360: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          920: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1224: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'right',
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.title_eng}>
            <Card {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
