'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { type AgendaDate } from '@prisma/client';
import axios, { type AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import { useLanguage } from '@/contexts/language-context';

import { type ResponseInterface } from '../speakers/interfaces/response.interface';
import styles from './agenda.module.css';

export default function Agendas(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [agendas, setAgendas] = useState<AgendaDate[]>([]);

  const fetchSpeakers = useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<AgendaDate[]>> = await axios.get(`/api/agenda`);

    if (response.data.success) {
      setAgendas(response.data.data);
    }
  }, []);

  useEffect(() => {
    fetchSpeakers().catch((error: unknown) => {
      console.error('Error in fetchSpeakers:', error);
    });
  }, [fetchSpeakers]);

  const router = useRouter();
  return (
    <Box>
      <Typography variant="h1">{renderLanguage('აჯენდა', 'Agenda')}</Typography>

      <Box className={styles.mainWrapper}>
        {agendas.map((agenda: AgendaDate) => (
          <Card key={agenda.id}>
            <CardContent>
              <Box width="100%" display="flex" justifyContent="flex-end">
                <IconButton
                  onClick={() => {
                    router.push(`add-agenda?agendaId=${agenda.id}`);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              <Box className={styles.speakerWrapper}>
                <Typography>{dayjs(agenda.date).format('MM-DD-YYYY')}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box />
    </Box>
  );
}
