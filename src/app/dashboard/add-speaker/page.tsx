import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import AddSpeakerForm from '@/components/dashboard/add-speaker/add-speaker';

export const metadata = { title: `Add Speaker | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <AddSpeakerForm />
    </Box>
  );
}
