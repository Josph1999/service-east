'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Pagination } from '@mui/material';
import axios, { type AxiosResponse } from 'axios';

import { useLanguage } from '@/contexts/language-context';

import { type ResponseInterface } from '../speakers/interfaces/response.interface';
import { type NewsInterface } from './interfaces/news.interface';
import PublishedNewsCard from './published-news-card/published-news-card';

export default function PublishedNews(): React.JSX.Element {
  const rowsPerPage = 10;

  const { renderLanguage } = useLanguage();
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState(0);

  const [news, setNews] = useState<NewsInterface[]>([]);

  const fetchSpeakers = useCallback(async (): Promise<void> => {
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
    fetchSpeakers().catch((error: unknown) => {
      console.error('Error in fetchSpeakers:', error);
    });
  }, [fetchSpeakers]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <Box>
      <h1>{renderLanguage('დამატებული სიახლეები', 'Published news')}</h1>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap="27px"
        marginTop="20px"
      >
        {news.length > 0 ? (
          news.map((newsData: NewsInterface) => <PublishedNewsCard key={newsData.id} news={newsData} />)
        ) : (
          <p>No news to display</p>
        )}
      </Box>
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
