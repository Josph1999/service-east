'use client';

import React, { useCallback, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Card, CardContent, IconButton, Pagination, Typography } from '@mui/material';
import axios, { type AxiosResponse } from 'axios';

import { useLanguage } from '@/contexts/language-context';

import { type ResponseInterface, type SpeakerInterface } from './interfaces/response.interface';
import styles from './speakers.module.css';

export default function Speakers(): React.JSX.Element {
  const rowsPerPage = 10;

  const { renderLanguage } = useLanguage();
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState(0);

  const [speakers, setSpeakers] = useState<SpeakerInterface[]>([]);

  const fetchSpeakers = useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<SpeakerInterface[]>> = await axios.get(
      `/api/speakers?page=${page.toString()}&rowsPerPage=${rowsPerPage.toString()}&sortBy=created_at&direction=desc`
    );

    if (response.data.success) {
      setSpeakers(response.data.data);
      if (response.data.count) {
        setCount(response.data.count);
      }
    }
  }, [page]);

  useEffect(() => {
    fetchSpeakers().catch((error: unknown) => {
      console.error('Error in fetchSpeakers:', error);
    });
  }, [fetchSpeakers]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };
  return (
    <Box>
      <Typography variant="h1">{renderLanguage('სპიკერები', 'Speakers')}</Typography>

      <Box className={styles.mainWrapper}>
        {speakers.map((speaker: SpeakerInterface) => (
          <Card key={speaker.id}>
            <CardContent>
              <Box width="100%" display="flex" justifyContent="flex-end">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Box>
              <Box className={styles.speakerWrapper}>
                <Avatar src={speaker?.image ? speaker?.image[0]?.url : ''} sx={{ width: '100px', height: '100px' }} />
                <Typography fontWeight={700}>{renderLanguage(speaker.name_ka, speaker.name_eng)}</Typography>
                <Typography>{renderLanguage(speaker.position_ka, speaker.position_eng)}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box />
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" marginTop="20px">
        <Pagination
          count={Math.ceil(count / rowsPerPage) || 1}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
