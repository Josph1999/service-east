'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import { useLanguage } from '@/contexts/language-context';

import { type NewsInterface } from '../dashboard/published-news/interfaces/news.interface';
import ArrowIcon from '../icons/arrow-icon';

export interface NewsCardProps {
  item: NewsInterface;
}

export default function NewsCard(props: NewsCardProps): React.JSX.Element {
  const { item } = props;
  const { renderLanguage } = useLanguage();

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%), url(${item.images[0].url}) lightgray 50% / cover no-repeat`,
        width: '100%',
        height: '480px',
        position: 'relative', // Add position: relative to the outer Box
      }}
    >
      <Box
        sx={{
          position: 'absolute', // Add position: absolute to the inner Box
          bottom: 0, // Position it at the bottom
          width: '100%',
          padding: '16px', // Add some padding if needed
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ color: 'white', fontWeight: '500', textTransform: 'uppercase', fontSize: '22px' }}>
            {`${renderLanguage(`${item.title_ka.slice(0, 30)  }...`, item.title_eng).slice(0, 30)}...`}
          </Typography>
          <ArrowIcon />
        </Box>

        <Typography sx={{ color: 'white' }}>
          {renderLanguage(`${item.title_ka.slice(0, 150)}...`, `${item.title_eng.slice(0, 150)}...`)}
        </Typography>
      </Box>
    </Box>
  );
}
