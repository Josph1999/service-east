'use client';

import * as React from 'react';
import { Box, Button, Fade, TextField, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useLanguage } from '@/contexts/language-context';

import { QuillEditor } from '../quill-editor/quill-editor';
import styles from './add-post-details.module.css';

interface AddPostDetailsProps {
  onSubmit: (data: { from: number; to: number }) => void;
  setDescription: (value: string | ((prevVar: string) => string)) => void;
  description: string;
  error: string;
}

export function AddPostDetails(props: AddPostDetailsProps): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const { onSubmit, description, setDescription, error } = props;

  const formik = useFormik({
    validationSchema: Yup.object({
      from: Yup.number()
        .positive()
        .required(renderLanguage('დან სავალდებულოა', 'From is required'))
        .min(10, renderLanguage('მინიმუმ 10', 'Minimum 10')),
      to: Yup.number()
        .positive()
        .required(renderLanguage('მდე სავალდებულოა', 'To is required'))
        .min(10, renderLanguage('მინიმუმ 10', 'Minimum 10')),
    }),
    initialValues: {
      from: 10000,
      to: 20000,
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Fade in>
      <Stack spacing={3}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Box className={styles.boxWrapper}>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  gap: '25px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography sx={{ color: 'white' }}>
                  {renderLanguage('ინვესტიციის თანხა', 'Investment amount')}
                </Typography>
                <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between', width: '100%' }}>
                  <TextField
                    error={Boolean(formik.touched.from && formik.errors.from)}
                    helperText={formik.touched.from ? formik.errors.from : null}
                    label={renderLanguage('დან', 'From')}
                    name="from"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.from}
                    fullWidth
                    className={styles.input}
                    type="number"
                  />
                  <TextField
                    error={Boolean(formik.touched.to && formik.errors.to)}
                    helperText={formik.touched.to ? formik.errors.to : null}
                    label={renderLanguage('მდე', 'To')}
                    name="to"
                    fullWidth
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.to}
                    className={styles.input}
                    type="number"
                  />
                </Box>
              </Box>
              <Typography sx={{ color: 'white' }}>{renderLanguage('აღწერა', 'Description')}</Typography>
              <Box sx={{width: '100%'}}>
                <QuillEditor
                  onChange={(value) => {
                    setDescription(value);
                  }}
                  value={description}
                />
              </Box>
            </Box>
            {error ? <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText> : null}
            <Button type="submit" variant="contained">
              {renderLanguage('დამატება', 'Add')}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Fade>
  );
}
