import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
// import PostCard from '@/components/post-card/post-card';
import { Box, Typography } from '@mui/material';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box display="flex" width="100%" justifyContent="center">
      <Typography variant="h1">Dashboard</Typography>
    </Box>
  );
}
