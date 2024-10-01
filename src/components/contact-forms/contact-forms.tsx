'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { type FormSubmissionInterface } from '@/app/api/contact-form/interfaces/form-submission.interface';
import { Box, Pagination } from '@mui/material';
import axios, { type AxiosResponse } from 'axios';

import { useLanguage } from '@/contexts/language-context';

import { type ResponseInterface } from '../interfaces/response.interface';
import ContactFormsCard from './contact-form-card.tsx/contact-form-card';

export default function ContactForms(): React.JSX.Element {
  const rowsPerPage = 10;

  const { renderLanguage } = useLanguage();
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState(0);

  const [contactForms, setContactForms] = useState<FormSubmissionInterface[]>([]);

  const fetchContactForms = useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<FormSubmissionInterface[]>> = await axios.get(
      `/api/contact-form?page=${page.toString()}&rowsPerPage=${rowsPerPage.toString()}&sortBy=created_at&direction=desc`
    );

    if (response.data.success) {
      setContactForms(response.data.data);
      if (response.data.count) {
        setCount(response.data.count);
      }
    }
  }, [page]);

  useEffect(() => {
    fetchContactForms().catch((error: unknown) => {
      console.error('Error in fetchVacancies:', error);
    });
  }, [fetchContactForms]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  return (
    <Box>
      <h1>{renderLanguage('საკონტაქტო ფორმები', 'Contact Forms')}</h1>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap="27px"
        marginTop="20px"
      >
        {contactForms.length > 0 ? (
          contactForms.map((vacancy: FormSubmissionInterface) => (
            <ContactFormsCard key={vacancy.id} contactForm={vacancy} />
          ))
        ) : (
          <p>No Contact forms</p>
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
