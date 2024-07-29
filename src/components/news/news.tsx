'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import axios, { type AxiosResponse } from 'axios';

import { type NewsInterface } from '../dashboard/published-news/interfaces/news.interface';
import { type ResponseInterface } from '../dashboard/speakers/interfaces/response.interface';
import NewsCard from '../news-card/news-card';

export default function NewsPage(): React.JSX.Element {
  const rowsPerPage = 10;

  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState(0);

  const [news, setNews] = useState<NewsInterface[]>([]);

  const fetchNews = useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<NewsInterface[]>> = await axios.get(
      `/api/news?page=${page.toString()}&rowsPerPage=${rowsPerPage.toString()}&sortBy=created_at&direction=desc`
    );

    if (response.data.success) {
      setNews(response.data.data);
      if (response.data.count) {
        setCount(response.data.count);
      }
    }
  }, [page]);

  useEffect(() => {
    fetchNews().catch((error: unknown) => {
      console.error('Error in fetching news:', error);
    });
  }, [fetchNews]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        padding: '184px 256px',
        backgroundImage: `url(/assets/MainBackground.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '@media (max-width: 1200px)': {
          padding: '90px 128px',
        },
        '@media (max-width: 1000px)': {
          padding: '80px 64px',
        },
        '@media (max-width: 760px)': {
          padding: '80px 24px',
        },
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <Grid container spacing={2}>
        {news.length > 0 ? (
          news.map((newsData: NewsInterface) => (
            <Grid item xs={12} sm={6} md={4} key={newsData.id}>
              <NewsCard key={newsData.id} item={newsData} />
            </Grid>
          ))
        ) : (
          <p>იტვირთება...</p>
        )}
      </Grid>
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
