import * as React from 'react';
import type { Metadata } from 'next';
import { Box } from '@mui/material';

import { config } from '@/config';
import Agendas from '@/components/dashboard/agendas/agendas';

export const metadata = { title: `Agendas| Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box>
      <Agendas />
    </Box>
  );
}
