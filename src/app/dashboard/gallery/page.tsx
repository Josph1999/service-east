import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import UploadGallery from '@/components/dashboard/gallery/gallery';

export const metadata = { title: `Add Speaker | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <UploadGallery />
    </Box>
  );
}
