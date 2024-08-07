import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import EditVacancyForm from '@/components/dashboard/edit-vacancy/edit-vacancy';

export const metadata = { title: `Edit Vacancy| Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <EditVacancyForm />
    </Box>
  );
}
