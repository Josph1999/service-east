import React from 'react';
import { Box, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

interface CardProps {
  title_ka: string;
  title_eng: string;
  description_ka: string;
  description_eng: string;
  image: string;
  isTeam?: boolean;
}

export default function Card(props: CardProps): React.JSX.Element {
  const {
    image,
    title_eng: titlEng,
    title_ka: titleKa,
    description_eng: descriptionEng,
    description_ka: descriptionKa,
    isTeam = false,
  } = props;

  const { renderLanguage } = useLanguage();

  return (
    <Box
      sx={{
        width: '100%',
        height: '500px',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        backgroundSize: isTeam ? 'contain' : 'cover',
        cursor: 'pointer',
        filter: 'grayscale(100%)',
        transition: 'filter 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // Align text at the bottom
        '&:hover': {
          filter: 'grayscale(0%)',
        },
        '&:hover .description': {
          opacity: 1,
          visibility: 'visible',
          maxHeight: '200px',
        },
        '@media (max-width: 1000px)': {
          height: '500px',
        },
      }}
    >
      {isTeam ? null : (
        <Box sx={{ padding: '24px', backgroundColor: '#fff' }}>
          <Typography sx={{ fontFeatureSettings: "'case' on", fontWeight: 700, width: '100%' }}>
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
      )}
    </Box>
  );
}
