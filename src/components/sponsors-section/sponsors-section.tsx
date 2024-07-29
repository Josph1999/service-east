'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { type Sponsors } from '@prisma/client';
import axios, { type AxiosResponse } from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useLanguage } from '@/contexts/language-context';

import { type ResponseInterface } from '../dashboard/speakers/interfaces/response.interface';
import { Autoplay } from 'swiper/modules';

export default function SponsorsSection(): React.JSX.Element {
  const [sponsors, setSponsors] = useState<Sponsors[]>([]);

  const { renderLanguage } = useLanguage();

  const fetchSponsors = useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<Sponsors[]>> = await axios.get(`/api/sponsors`);

    if (response.data.success) {
      setSponsors(response.data.data);
    }
  }, []);

  useEffect(() => {
    fetchSponsors().catch((error: unknown) => {
      console.error('Error in fetchSpeakers:', error);
    });
  }, [fetchSponsors]);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundImage: `url(/assets/MainBackground.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0px',
        paddingBottom: '120px',
      }}
    >
      <Box
        sx={{
          padding: '50px 256px',
          '@media (max-width: 1200px)': {
            padding: '40px 128px',
          },
          '@media (max-width: 1000px)': {
            padding: '40px 64px',
          },
          '@media (max-width: 760px)': {
            padding: '40px 24px',
          },
        }}
      >
        <Typography
          fontWeight={700}
          sx={{
            textAlign: 'center',
            color: '#232C65',
            fontSize: '32px',
            '@media (max-width: 1200px)': {
              fontSize: '24px',
            },
            fontFeatureSettings: "'case' on",
            textTransform: 'uppercase',
          }}
        >
          {renderLanguage('სპონსორები & დონორები', 'SPONSORS & DONORS')}
        </Typography>
      </Box>
      <Swiper
        loop
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        modules={[Autoplay]}
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
            slidesPerView: 3,
            spaceBetween: 20,
          },
          920: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1224: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
      >
        {sponsors.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <a href={item.link} target="_blank" rel="noreferrer">
                <Box
                  sx={{
                    width: '100%',
                    backgroundImage: `url(${item.logo_url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    height: '50px',
                  }}
                />
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
