import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import AddAgendaForm from '@/components/dashboard/add-agenda-details/add-agenda-details';

export const metadata = { title: `Add Agenda | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <AddAgendaForm />
    </Box>
  );
}
