'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import { useLanguage } from '@/contexts/language-context';

import mainFactory from '../../../public/assets/FactoryMain.png';
import { useRouter } from 'next/navigation';

export default function MainContent(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const router = useRouter();

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
        padding: { xs: '80px 24px', sm: '80px 64px', md: '90px 128px', lg: '128px 256px' },
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
          transform: 'rotateX(180deg)',
        },
      }}
      ref={ref}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: '40px' }}>
        <Box sx={{ maxWidth: { xs: '100%', md: '50%' }, mb: { xs: '24px', md: 0 } }}>
          <Image width={700} height={800} src={mainFactory} alt="Factory Image" style={{ width: '100%', height: 'auto' }} />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: { xs: 'center', md: 'left' }}}>
          <Typography sx={{ fontSize: { xs: '30px', sm: '35px', md: '40px' }, fontWeight: 700, fontFeatureSettings: "'case' on" }} className='tracking-in-contract-bck'>
            {renderLanguage('სამრეწველო აღჭურვილობის მიმწოდებელი', 'Provider of Industrial Equipment Solutions')}
          </Typography>
          <Typography sx={{ mt: '16px' }}>
            {renderLanguage(
              'გლობალური კომპანია კვების, სასმელების და ქიმიური მრეწველობის გამოცდილებით.',
              'A global company with experience in food, beverage and chemical industries.'
            )}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px', marginTop: '30px', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Button variant="contained" sx={{ borderRadius: '0px', backgroundColor: '#1362FF', color: '#fff' }} onClick={() => {router.push('/contact')}}>
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
