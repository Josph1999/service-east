'use client';

import React from 'react';
import { Box } from '@mui/material';

import Card from './card/card';
import { data } from './data';

export default function KeyConcepts(): React.JSX.Element {
  return (
    <Box
      sx={{
        padding: '128px 256px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        backgroundImage: `url(/assets/DotsBackground.png)`,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {data.map((item) => {
        return <Card key={item.title_ka} {...item} />;
      })}
    </Box>
  );
}
