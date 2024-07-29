'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import { useLanguage } from '@/contexts/language-context';

import mainFactory from '../../../public/assets/FactoryMain.png';

export default function MainContent(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const playVideo = async () => {
      const video = videoRef.current;

      try {
        if (video) {
          // Add the playsinline attribute
          video.setAttribute('playsinline', '');

          await video.play();
          console.log('Video started playing');
        }
      } catch (error: unknown) {
        console.error('Autoplay failed:', error);
      }
    };

    playVideo()
      .then((item) => item)
      .catch((error: unknown) => error);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        padding: '128px 256px',
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
        transition: 'opacity 3s ease, transform 0.5s ease',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(/assets/Rectangle.png)`, // replace with your SVG file path
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'right',
          zIndex: -1,
          animation: inView ? 'rotateBg 3s ease-out forwards' : 'none',
          transform: 'rotateX(180deg)'
        },
      }}
      ref={ref}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Image width={700} height={800} src={mainFactory} alt="Factory Image" />
        <Box sx={{ width: '575px' }}>
          <Typography sx={{ fontSize: '40px', fontWeight: 700, fontFeatureSettings: "'case' on" }} className='tracking-in-contract-bck'>
            {renderLanguage('სამრეწველო აღჭურვილობის მიმწოდებელი', 'Provider of Industrial Equipment Solutions')}
          </Typography>
          <Typography>
            {renderLanguage(
              'გლობალური კომპანია კვების, სასმელების და ქიმიური მრეწველობის გამოცდილებით.',
              'A global company with experience in food, beverage and chemical industries.'
            )}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
            <Button variant="contained" sx={{ borderRadius: '0px', backgroundColor: '#1362FF', color: '#fff' }}>
              {renderLanguage('სერვისის მოთხოვნა', 'Request For Service')}
            </Button>
            <Button variant="outlined" sx={{ borderRadius: '0px', color: 'black', borderColor: 'black' }}>
              {renderLanguage('მეტის ნახვა', 'Learn More')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
