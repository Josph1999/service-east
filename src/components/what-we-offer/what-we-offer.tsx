'use client';

import React, { useEffect, useRef } from 'react';
import { useWindowWidth } from '@/helpers/window-width';
import { Box, Typography } from '@mui/material';

import { Language, useLanguage } from '@/contexts/language-context';

import bottlesSrc from '../../../public/assets/Bottles.jpeg';
import ArrowIcon from '../icons/arrow-icon';

export default function WhatWeOffer(): React.JSX.Element {
  const { renderLanguage, language } = useLanguage();
  const windowWidth = useWindowWidth();
  
  
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
      display={{ xs: 'block', md: 'flex' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={{ xs: '20px', md: '40px' }}
      sx={{ padding: { xs: '16px', md: '24px' } }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '20px', md: '50px' },
          width: { xs: '100%', md: 'auto' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '20px', md: '0' } }}>
          <Box
            sx={{
              padding: '32px 24px',
              backgroundColor: '#F1F7FE',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: { xs: '100%', md: 'auto' },
              '@media (max-width: 1000px)': {
                padding: '40px 24px',
                flexDirection: 'row-reverse',
              },
            }}
          >
            <ArrowIcon fill="black" />
            <Typography
              sx={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                fontWeight: 700,
                fontSize: { xs: '20px', md: '24px' },
                textAlign: 'center',
                '@media (max-width: 1000px)': {
                  writingMode: 'revert',
                  transform: 'rotate(0deg)',
                },
              }}
            >
              {renderLanguage('რას გთავაზობთ?', 'What We Offer?')}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: { md: '64px', xs: '24px' },
              backgroundColor: '#F1F7FE',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              width: { xs: '100%', md: 'auto' },
            }}
          >
            <Typography sx={{ fontSize: { xs: '20px', md: '32px' }, fontWeight: 700}}>
              {renderLanguage(
                'გამოცდილი ინჟინერებისა და მექანიკოსებისგან შემდგარი გუნდი მზად არის გაგიწიოთ მომსახურება საწარმოო ხაზების სერვისების ფართო სპექტრში. ',
                'Service Offering'
              )}
            </Typography>
            <Typography >
              {renderLanguage(
                'მრავალწლიანი გამოცდილებისა და გლობალური პარტნიორობების შედეგად, სერვის ისტ საქართველოს გუნდს გააჩნია ხარისხისა და ეფექტურობის გარანტია, რომელიც თავის მხრივ ჩვენს მომხმარებლებსა და პარტნიორებს უქმნის საწარმოო ბიზნესის წარმართვის სტაბილურ და გამართულ შესაძლებლობებს. ',
                'Service East Georgia is a global company specializing in the installation, assembly, and maintenance of equipment for the food, medical, and chemical industries. Our primary focus is the repair and servicing of filling systems for a wide variety of products, including water, beer, juice, oil, wine, milk, and bulk goods of different consistencies. We also provide expert services for labeling and packaging equipment for both glass and PET bottles, among other solutions.'
              )}
            </Typography>
            {windowWidth > 1000 ? (
              <img src={bottlesSrc.src} width={544} height={400} alt="Services" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            ) : null}
          </Box>
          <Box
            sx={{
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '5px solid #F1F7FE',
              width: { xs: '100%', md: 'auto' },
              '@media (max-width: 1000px)': {
                padding: '40px 24px',
                flexDirection: 'row-reverse',
              },
            }}
          >
            <ArrowIcon fill="black" />
            <Typography
              sx={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                fontWeight: 700,
                fontSize: { xs: '20px', md: '24px' },
                textAlign: 'center',
                '@media (max-width: 1000px)': {
                  writingMode: 'revert',
                  transform: 'rotate(0deg)',
                },
              }}
            >
              {renderLanguage('რას გთავაზობთ?', 'What We Offer?')}
            </Typography>
          </Box>
        </Box>

      </Box>
      {windowWidth > 1400 ? (
        <video width="770" height={ language === Language.KA ? "965px" : "845px"} controls style={{ objectFit: 'cover' }} ref={videoRef} autoPlay muted loop>
          <source
            src="https://firebasestorage.googleapis.com/v0/b/georaffal.appspot.com/o/Service_East_Video2.mp4?alt=media&token=6a60af95-c4d4-42a6-8766-65514cb9fc30"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : null}
    </Box>
  );
}
