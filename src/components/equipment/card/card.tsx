'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

interface CardProps {
  title_ka: string;
  title_eng: string;
  icon: React.JSX.Element;
}

export default function Card(props: CardProps): React.JSX.Element {
  const { renderLanguage } = useLanguage();
  return (
    <Box sx={{ height: '150px', width: '100%', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        {props.icon}
        <Typography>{renderLanguage(props.title_ka, props.title_eng)}</Typography>
      </Box>
    </Box>
  );
}
