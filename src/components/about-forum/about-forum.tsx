'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import { useLanguage } from '@/contexts/language-context';

export default function AboutForum(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [ref, inView] = useInView({
    triggerOnce: false,
  });
  const calculateTimeLeft = (): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } => {
    const targetDate = new Date('2024-07-11T00:00:00');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const addLeadingZero = (num: number): string | number => (num < 10 ? `0${num.toString()}` : num);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        marginRight: '256px',

        '@media (max-width: 1200px)': {
          marginRight: '128px',
        },
        '@media (max-width: 1000px)': {
          marginRight: '64px',
        },
        '@media (max-width: 760px)': {
          marginRight: '28px',
        },
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        marginTop: '50px',
      }}
      ref={ref}
    >
      <Box
        sx={{
          backgroundColor: '#232C65',
          padding: '80px 256px',
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
          borderRadius: '0px 32px 32px 0px',
          '@media (max-width: 1200px)': {
            padding: '60px 128px',
          },
          '@media (max-width: 1700px)': {
            paddingRight: '128px',
          },
          '@media (max-width: 1400px)': {
            flexDirection: 'column',
          },
          '@media (max-width: 1000px)': {
            padding: '40px 64px',
          },
          '@media (max-width: 760px)': {
            padding: '20px 24px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            color: 'white',
          }}
        >
          <Typography
            fontWeight={700}
            sx={{
              fontSize: '32px !important',
              '@media (max-width: 1200px)': {
                fontSize: '24px',
              },
              fontFeatureSettings: "'case' on",
              textTransform: 'uppercase',
            }}
          >
            {renderLanguage('ფორუმის შესახებ', 'ABOUT FORUM')}
          </Typography>
          <Typography
            sx={{
              '@media (max-width: 1200px)': {
                fontSize: '12px',
              },
            }}
          >
            {renderLanguage(
              `სამოქმედო ფორუმი 2024 განიხილავს იმ კრიტიკულ საკითხებს, რომელთა წინაშეც დგას ახალგაზრდობა საქართველოში
             ძირითადი ზომები: ეკონომიკური, პოლიტიკური და ციფრული. ეს ფორუმი მიზნად ისახავს გახდეს ჯვარედინი
             დიალოგი, ცოდნის გაცვლა და ქმედითი გადაწყვეტილებების ფორმულირება
             ეხმაურება საქართველოს უნიკალურ სოციალურ-პოლიტიკურ და ეკონომიკურ ლანდშაფტს. მოწვევით
             პოლიტიკოსების, პედაგოგების, სამოქალაქო საზოგადოების აქტორებისა და ახალგაზრდა ლიდერების მრავალფეროვანი ასამბლეა
             სხვადასხვა სახელმწიფოები.`,
              `The Action Forum 2024 will address the critical issues facing youth in Georgia across three
            key dimensions: economic, political, and digital. This forum aims to serve as a crucible for
            dialogue, knowledge exchange, and the formulation of actionable solutions that are
            responsive to the unique socio-political and economic landscape of Georgia. By convening
            a diverse assembly of policymakers, educators, civil society actors, and young leaders from
            various states.`
            )}
          </Typography>
        </Box>
        <Box sx={{ color: 'white', width: '100%' }}>
          <Typography sx={{ color: 'white', marginBottom: '20px' }}>
            {renderLanguage('ფორუმამდე დარჩა', 'Time left till forum')}
          </Typography>
          <Box>
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'space-between',
                width: '400px',
                '@media (max-width: 1000px)': {
                  width: '100%',
                  gap: '10px',
                },
              }}
            >
              <Box>
                <Typography fontWeight={700} sx={{ fontSize: '26px' }}>
                  {addLeadingZero(timeLeft.days)}
                </Typography>
                <Typography>{renderLanguage('დღე', 'Days')}</Typography>
              </Box>
              <Box sx={{ height: '65px', borderLeft: '1px solid white' }} />
              <Box>
                <Typography fontWeight={700} sx={{ fontSize: '26px' }}>
                  {addLeadingZero(timeLeft.hours)}
                </Typography>
                <Typography>{renderLanguage('საათი', 'Hour')}</Typography>
              </Box>
              <Box sx={{ height: '65px', borderLeft: '1px solid white' }} />
              <Box>
                <Typography fontWeight={700} sx={{ fontSize: '26px' }}>
                  {addLeadingZero(timeLeft.minutes)}
                </Typography>
                <Typography>{renderLanguage('წუთი', 'Minutes')}</Typography>
              </Box>
              <Box sx={{ height: '65px', borderLeft: '1px solid white' }} />
              <Box>
                <Typography fontWeight={700} sx={{ fontSize: '26px' }}>
                  {addLeadingZero(timeLeft.seconds)}
                </Typography>
                <Typography>{renderLanguage('წამი', 'Seconds')}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
