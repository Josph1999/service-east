import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import AddNewsForm from '@/components/dashboard/add-news/add-news';

export const metadata = { title: `Add Speaker | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <AddNewsForm />
    </Box>
  );
}
