import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import AddSponsorForm from '@/components/dashboard/add-sponsor/add-sponsor';

export const metadata = { title: `Add Speaker | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <AddSponsorForm />
    </Box>
  );
}
