'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import styles from './main-content.module.css';

export default function MainContent(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

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
        padding: {
          xs: '80px 24px',
          sm: '80px 64px',
          md: '90px 128px',
          lg: '128px 256px',
          backgroundImage: `url(/assets/DotsBackground.png)`,
        },
      }}
    >
      <video ref={videoRef} autoPlay muted loop className={styles.videoBackground}>
        <source src="https://service-east.com/wp-content/uploads/2022/11/about.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Box
        sx={{
          width: '100%',
          height: '75vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: { xs: '30px', sm: '35px', md: '40px' },
                fontWeight: 700,
                fontFeatureSettings: "'case' on",
                color: 'white',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {renderLanguage('რეგიონალური ბაზრის ლიდერი, სამრეწველო აღჭურვილობის სერვისების სფეროში', 'Provider of Industrial Equipment Solutions')}
            </Typography>
            <Typography sx={{ mt: '16px', color: 'white', position: 'relative' }}>
              {renderLanguage(
                'მრავალწლიანი გამოცდილება  კვების, სასმელებისა და ქიმიური მრეწველობის დანადგარების სერვისში.',
                'A global company with experience in food, beverage and chemical industries.'
              )}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '20px',
                marginTop: '30px',
                justifyContent: 'center',
                alignItems: 'center',
                '@media (max-width: 800px)': {
                  flexDirection: 'column',
                },
              }}
            >
              <Button
                variant="contained"
                sx={{ borderRadius: '0px', backgroundColor: '#1362FF', color: '#fff' }}
                onClick={() => {
                  router.push('/contact');
                }}
              >
                {renderLanguage('დაგვიკავშირდი', 'Request For Service')}
              </Button>
              <Button variant="outlined" sx={{ borderRadius: '0px', color: 'white', borderColor: 'white' }}>
                {renderLanguage('მეტის ნახვა', 'Learn More')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
