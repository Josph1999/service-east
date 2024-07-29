'use client';

import * as React from 'react';
import { Box, Fade, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { type Dayjs } from 'dayjs';
import { type FormikProps } from 'formik';

import { useLanguage } from '@/contexts/language-context';

import styles from './add-agenda-date.module.css';

interface AgendaDateProps {
  formik: FormikProps<{ date: Dayjs }>;

}

export default function AddAgendaDate(props: AgendaDateProps): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const { formik } = props;

  const setValue = (date: Dayjs | null): void => {
    formik
      .setFieldValue('date', date)
      .then((data) => {
        data;
      })
      .catch((error: unknown) => {
        error;
      });
  };

 

  return (
    <Fade in>
      <Stack spacing={3}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack spacing={2}>
            <Box className={styles.boxWrapper}>
              <Box display="flex" alignItems="center" gap="20px">
                <Typography>{renderLanguage('აირჩიეთ დღე', 'Please select date')}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Basic date picker"
                      value={formik.values.date}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Fade>
  );
}
