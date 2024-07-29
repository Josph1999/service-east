'use client';

import React, { useCallback, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { type Sponsors } from '@prisma/client';
import axios, { type AxiosResponse } from 'axios';

import { useLanguage } from '@/contexts/language-context';

import { type ResponseInterface } from '../speakers/interfaces/response.interface';
import styles from './sponsors.module.css';

export default function AllSponsors(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [sponsors, setSponsors] = useState<Sponsors[]>([]);

  const fetchSponsors = useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<Sponsors[]>> = await axios.get(`/api/sponsors`);

    if (response.data.success) {
      setSponsors(response.data.data);
    }
  }, []);

  useEffect(() => {
    fetchSponsors().catch((error: unknown) => {
      console.error('Error in fetchSpeakers:', error);
    });
  }, [fetchSponsors]);

  return (
    <Box>
      <Typography variant="h1">{renderLanguage('სპონსორები', 'Sponsors')}</Typography>

      <Box className={styles.mainWrapper}>
        {sponsors.map((sponsor: Sponsors) => (
          <Card key={sponsor.id}>
            <CardContent>
              <Box width="100%" display="flex" justifyContent="flex-end">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Box>
              <Box className={styles.speakerWrapper}>
                <Avatar src={sponsor?.logo_url ? sponsor?.logo_url : ''} sx={{ width: '100px', height: '100px' }} />
                <Typography>{sponsor.link}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box />
    </Box>
  );
}
