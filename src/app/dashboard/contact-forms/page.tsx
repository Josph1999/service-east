import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import ContactForms from '@/components/contact-forms/contact-forms';

export const metadata = { title: `Add Vacancy | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <ContactForms />
    </Box>
  );
}
