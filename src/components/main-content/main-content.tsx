'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import { useLanguage } from '@/contexts/language-context';

import GreenDotIcon from '../icons/green-dot-icon';
import LinkLogo from '../icons/link-logo';
import styles from './main-content.module.css';

export default function MainContent(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [ref, inView] = useInView({
    triggerOnce: false,
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
    <>
      <video ref={videoRef} autoPlay muted loop className={styles.videoBackground}>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/actionforum-5eae8.appspot.com/o/office%20video%20edited.mp4?alt=media&token=86d6568e-e46a-4a97-9ed8-da8c243d9b91"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '60px',
          zIndex: 2,
          paddingLeft: '128px',
          '@media (max-width: 800px)': {
            padding: '0px',
            justifyContent: 'center',
            alignItems: 'center',
          },
          position: 'relative',
          background:
          'linear-gradient(180deg, #121212 0%, rgba(38, 38, 38, 0.00) 50%), linear-gradient(180deg, rgba(38, 38, 38, 0.00) 26.3%, #262626 100%)',
        }}
      >
        <Box
          sx={{
            padding: '184px 256px',
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
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  color: '#fff',
                  fontSize: '38px',
                  fontWeight: '700',
                  '@media (max-width: 1000px)': {
                    fontSize: '24px',
                  },
                  '@keyframes text-focus-in': {
                    '0%': {
                      filter: 'blur(12px)',
                      opacity: 0,
                    },
                    '100%': {
                      filter: 'blur(0px)',
                      opacity: 1,
                    },
                  },
                  animation: inView ? 'text-focus-in 1s ease-out' : 'none',
                  fontFeatureSettings: "'case' on",
                  textTransform: 'uppercase',
                }}
              >
                {renderLanguage('აქტის ფორუმი 2024', 'ACTION FORUM 2024')}
              </Typography>
              <Box
                sx={{
                  border: '1px solid white',
                  padding: '4px 16px',
                  borderRadius: '16px',
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <GreenDotIcon />
                <Typography
                  sx={{
                    color: 'white',
                    '@media (max-width: 1000px)': {
                      fontSize: '12px',
                    },
                  }}
                >
                  {renderLanguage('11-14 ივლისი,', '11-14 July,')}
                </Typography>
                <Typography fontWeight={700} sx={{ color: 'white' }}>
                  {renderLanguage('თბილისი', 'Tbilisi')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                  sx={{
                    color: '#fff',
                    textAlign: 'center',
                    width: '800px',
                    '@media (max-width: 1000px)': {
                      width: '100%',
                      fontSize: '12px',
                      marginTop: '20px',
                    },
                    marginTop: '150px',
                  }}
                >
                  {renderLanguage(
                    `გეოპოლიტიკური ნაკადითა და სწრაფი ტექნოლოგიური ევოლუციით განსაზღვრულ ეპოქაში, მსოფლიო
                მოწმეა ახალგაზრდების ნავიგაცია უპრეცედენტო გაურკვევლობის დროს.  შავი
                ზღვის რეგიონი, საქართველოს ჩათვლით, დგას კრიტიკულ გზაჯვარედინზე და ებრძვის ზემოქმედებას
                გლობალური გამოწვევების შესახებ, როგორიცაა ეკონომიკური უთანასწორობა, პოლიტიკური არეულობა და ციფრული სამყაროს გამოჩენა
                ტრანსფორმაცია.`,
                    `In an era defined by geopolitical flux and rapid technological evolution, the world
                witnesses the youth navigating through times of unprecedented uncertainty. The Black
                Sea region, including Georgia, stands at a critical crossroads, grappling with the impacts
                of global challenges such as economic disparities, political unrest, and the advent of digital
                transformation.`
                  )}
                </Typography>
                <a href="https://www.act.org.ge/" target="_blank" rel="noreferrer">
                  <Button
                    variant="contained"
                    sx={{ borderRadius: '0px', backgroundColor: '#232C65', marginTop: '20px' }}
                    endIcon={<LinkLogo />}
                  >
                    {renderLanguage('ორგანიზებულია ACT Georgia-ის მიერ', 'Organized by ACT Georgia')}
                  </Button>
                </a>
              </Box>
              <Box />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
    // <>
    /* <video ref={videoRef} autoPlay muted loop className={styles.videoBackground}>
          <source
            src="https://firebasestorage.googleapis.com/v0/b/actionforum-5eae8.appspot.com/o/office%20video%20edited.mp4?alt=media&token=86d6568e-e46a-4a97-9ed8-da8c243d9b91"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '60px',
            zIndex: 2,
            paddingLeft: '128px',
            '@media (max-width: 800px)': {
              padding: '0px',
              justifyContent: 'center',
              alignItems: 'center',
            },
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '10px',
              '@media (max-width: 800px)': {
                fontSize: '12px',
                justifyContent: 'flex-start',
                alignItems: 'left',
                textAlign: 'left',
                paddingLeft: '24px',
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                textAlign: 'left',
                fontFamily: 'UpperCaseGeo',
                fontFeatureSettings: "'case' on",
                '@media (max-width: 800px)': {
                  fontSize: '32px',
                  justifyContent: 'left',
                  alignItems: 'left',
                  textAlign: 'left',
                },
              }}
            >
              {renderLanguage('ქმედება', 'Action')} <br /> {renderLanguage('საზოგადოებრივი', 'For Community')}
              <br />
              {renderLanguage('ცვლილებებისთვის', 'Transformation')}
              <br />
              {renderLanguage('საქართველო', 'Georgia')}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={500}
              sx={{
                color: 'white',
                '@media (min-width: 800px)': {
                  width: '384px',
                },
              }}
            >
              {renderLanguage(
                'ორგანიზაციის მიზანია ხელი შეუწყოს საზოგადოებრივ გაძლიერებას ინკლუზიურობის, თანაბარმნიშვნელოვან ჩართულობისა და სოციო-ეკონომიკური ინოვაციების მხარდაჭერის მექანიზმებით.',
                'Organization on a mission to uplift and strengthen vulnerable communities through inclusive, transparent and holistic engagement. Making impact by driving socio-economic development and policy entrepreneurship for all members of society!'
              )}{' '}
            </Typography>
          </Box>
        </Box> */
    // </>
  );
}
