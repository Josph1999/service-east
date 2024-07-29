import React from 'react';
import { Box, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

interface CardProps {
  title_ka: string;
  title_eng: string;
  description_ka: string;
  description_eng: string;
  image: string;
}

export default function Card(props: CardProps): React.JSX.Element {
  const {
    image,
    title_eng: titlEng,
    title_ka: titleKa,
    description_eng: descriptionEng,
    description_ka: descriptionKa,
  } = props;

  const { renderLanguage } = useLanguage();

  return (
    <Box
      sx={{
        width: '459px',
        height: '539px',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        backgroundSize: 'cover',
        padding: '391px 24px 24px 24px',
        cursor: 'pointer',
        filter: 'grayscale(100%)',
        transition: 'filter 0.3s ease-in-out',
        '&:hover': {
          filter: 'grayscale(0%)',
        },
        '&:hover .description': {
          opacity: 1,
          visibility: 'visible',
          maxHeight: '200px', // Set to a reasonable value based on your content
        },
      }}
    >
      <Box sx={{ borderRadius: '0px 8px 8px 8px', padding: '32px', backgroundColor: '#fff' }}>
        <Typography sx={{ fontFeatureSettings: "'case' on", fontWeight: 700 }}>
          {renderLanguage(titleKa, titlEng)}
        </Typography>
        <Typography
          className="description"
          sx={{
            opacity: 0,
            visibility: 'hidden',
            maxHeight: 0,
            overflow: 'hidden',
            transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, max-height 0.3s ease-in-out',
          }}
        >
          {renderLanguage(descriptionKa, descriptionEng)}
        </Typography>
      </Box>
    </Box>
  );
}
