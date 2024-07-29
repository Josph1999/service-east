import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import PublishedNews from '@/components/dashboard/published-news/published-news';

export const metadata = { title: `Published news | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <PublishedNews />
    </Box>
  );
}
