'use client';

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Box, Button, IconButton, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { Navigation } from 'swiper/modules';

import { useLanguage } from '@/contexts/language-context';

import GreenDotIcon from '../icons/green-dot-icon';
import ArrowRight from '../icons/icon-right-icon';
import InfoIcon from '../icons/info-icon';
import { speakerData } from './data';

export default function SpeakerSlider(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  return (
    <Box
      sx={{
        padding: '184px 256px',
        backgroundImage: `url(/assets/MainBackground.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '@media (max-width: 1200px)': {
          padding: '90px 128px',
        },
        '@media (max-width: 1000px)': {
          padding: '80px 64px',
        },
        '@media (max-width: 760px)': {
          padding: '80px 24px',
        },
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      ref={ref}
    >
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <InfoIcon />
        <Typography
          sx={{
            color: '#232C65',
            '@media (max-width: 1200px)': {
              fontSize: '12px',
            },
          }}
        >
          {renderLanguage(
            'თქვენ შეგიძლიათ ნახოთ სამივე პანელის ყველა დინამიკა',
            'You can see all speakers of all three panels'
          )}
        </Typography>
      </Box>
      <Typography
        fontWeight={700}
        sx={{
          fontSize: '32px',
          marginTop: '20px',
          marginBottom: '50px',
          '@media (max-width: 1200px)': {
            fontSize: '24px',
          },
        }}
      >
        {renderLanguage('სპიკერები', 'Speakers')}
      </Typography>
      <Swiper
        modules={[Navigation]}
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
      >
        {speakerData.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Box>
                <Box
                  sx={{
                    backgroundImage: `url(${item.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    objectFit: 'cover',
                    width: '100%',
                    height: '400px',
                    backgroundPosition: 'center',
                    position: 'relative',
                    borderRadius: '8px',
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 49.87%, #000 100%), url(${item.image}) lightgray 50% / cover no-repeat`,
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                    }}
                  >
                    <GreenDotIcon fill={item.color} />{' '}
                    <Typography
                      sx={{
                        color: 'white',
                        '@media (max-width: 1200px)': {
                          fontSize: '16px',
                        },
                      }}
                    >
                      {renderLanguage(item.panel_ka, item.panel_eng)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    gap: '16px',
                    marginTop: '16px',
                  }}
                >
                  <Typography
                    fontWeight={700}
                    sx={{
                      fontSize: '24px',
                      color: 'black',
                      '@media (max-width: 1200px)': {
                        fontSize: '18px',
                      },
                    }}
                  >
                    {renderLanguage(item.name_ka, item.name_en)}
                  </Typography>
                  <Typography
                    fontWeight={700}
                    sx={{
                      '@media (max-width: 1200px)': {
                        fontSize: '14px',
                      },
                    }}
                  >
                    {renderLanguage(item.company_ka, item.company_eng)}
                  </Typography>
                  <Typography
                    sx={{
                      '@media (max-width: 1200px)': {
                        fontSize: '12px',
                      },
                    }}
                  >
                    {renderLanguage(item.position_ka, item.position_eng)}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" sx={{ borderRadius: '0px', backgroundColor: '#232C65', marginTop: '26px' }}>
            {renderLanguage('ყველა სპიკერი', 'All Speakers')}
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '5px',
              marginTop: '20px',
            }}
          >
            <IconButton sx={{ transform: 'rotate(180deg)' }} className="swiper-button-prev">
              <ArrowRight />
            </IconButton>
            <IconButton className="swiper-button-next">
              <ArrowRight />
            </IconButton>
          </Box>
        </Box>
      </Swiper>
    </Box>
  );
}
