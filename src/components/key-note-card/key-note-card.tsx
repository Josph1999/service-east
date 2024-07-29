'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

export interface KeyNoteCardProps {
  width: string;
  data: { title_ka: string; title_eng: string; description_ka: string; description_eng: string; image: string };
}

export default function KeyNoteCard(props: KeyNoteCardProps): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const {
    width,
    data: { description_eng: descEng, description_ka: descKa, image, title_eng: titleEng, title_ka: titleKa },
  } = props;

  return (
    <Box
      sx={{
        color: '#232C65',
        borderRadius: '2px',
        width,
        height: '430px',
        '@media (max-width: 1200px)': {
          height: '100%',
        },
        maxHeight: '430px',
        border: '0.25px solid gray',
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '240px',
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
        <Typography
          fontWeight={700}
          sx={{
            fontSize: '20px',
            '@media (max-width: 1200px)': {
              fontSize: '18px',
            },
          }}
        >
          {renderLanguage(titleKa, titleEng)}
        </Typography>
        <Typography
          sx={{
            '@media (max-width: 1200px)': {
              fontSize: '12px',
            },
          }}
        >
          {renderLanguage(descKa, descEng)}
        </Typography>
      </Box>
    </Box>
  );
}
