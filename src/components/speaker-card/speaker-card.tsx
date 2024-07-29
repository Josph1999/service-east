'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import GreenDotIcon from '../icons/green-dot-icon';

export interface Speaker {
  id: number;
  name_ka: string;
  name_en: string;
  panel_ka: string;
  panel_eng: string;
  position_ka: string;
  position_eng: string;
  image: string;
  company_ka: string;
  company_eng: string;
  color: string;
}

interface SpeakerCardProps {
  item: Speaker;
}

export default function SpeakerCard(props: SpeakerCardProps): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const { item } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          backgroundImage: `url(${item.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          objectFit: 'cover',
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
            width: '100%',
          }}
        >
          {renderLanguage(item.position_ka, item.position_eng)}
        </Typography>
      </Box>
    </Box>
  );
}
