import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import AllSponsors from '@/components/dashboard/sponsors/sponsors';

export const metadata = { title: `Sponsors | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <AllSponsors />
    </Box>
  );
}
