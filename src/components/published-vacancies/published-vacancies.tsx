'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Pagination } from '@mui/material';
import axios, { type AxiosResponse } from 'axios';

import { useLanguage } from '@/contexts/language-context';

import { type ResponseInterface, type Vacancy } from '../interfaces/response.interface';
import PublishedVacancyCard from './published-vacancy-card/published-vacancy-card';

export default function PublishedVacancies(): React.JSX.Element {
  const rowsPerPage = 10;

  const { renderLanguage } = useLanguage();
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState(0);

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  const fetchVacancies = useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<Vacancy[]>> = await axios.get(
      `/api/vacancies?page=${page.toString()}&rowsPerPage=${rowsPerPage.toString()}&sortBy=created_at&direction=desc`
    );

    if (response.data.success) {
      setVacancies(response.data.data);
      if (response.data.count) {
        setCount(response.data.count);
      }
    }
  }, [page]);

  useEffect(() => {
    fetchVacancies().catch((error: unknown) => {
      console.error('Error in fetchVacancies:', error);
    });
  }, [fetchVacancies]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <Box>
      <h1>{renderLanguage('დამატებული ვაკანსიები', 'Published Vacancies')}</h1>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap="27px"
        marginTop="20px"
      >
        {vacancies.length > 0 ? (
          vacancies.map((vacancy: Vacancy) => <PublishedVacancyCard key={vacancy.id} vacancy={vacancy} />)
        ) : (
          <p>No vacancies to display</p>
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
