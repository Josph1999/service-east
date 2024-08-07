import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import AddVacanciesForm from '@/components/dashboard/add-vacancies/add-vacancies';

export const metadata = { title: `Add Vacancy | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <AddVacanciesForm />
    </Box>
  );
}
