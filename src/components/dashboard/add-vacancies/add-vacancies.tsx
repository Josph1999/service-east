'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type FileInterface } from '@/app/api/vacancies/interfaces/add-vacancy-interface';
import { StorageName } from '@/enums/enums';
import { storage } from '@/firebase/firebase';
import { Box, Button, Fade, Stack, TextField, Typography } from '@mui/material';
import axios, { type AxiosResponse } from 'axios';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { paths } from '@/paths';
import { useLanguage } from '@/contexts/language-context';
import { ResponseInterface, Vacancy } from '@/components/interfaces/response.interface';

import styles from './add-vacancies.module.css';

export default function AddVacanciesForm(): React.JSX.Element {
  const { renderLanguage } = useLanguage();
  const [uploadedKa, setUploadedKa] = React.useState<FileInterface>();
  const [uploadedEng, setUploadedEng] = React.useState<FileInterface>();

  const router = useRouter();

  const formik = useFormik({
    validationSchema: Yup.object({
      title_ka: Yup.string().required(renderLanguage('სათაური ქართულად სავალდებულოა', 'Title ka required')),
      title_eng: Yup.string().required(renderLanguage('სათაური ინგლისურად სავალდებულოა', 'Title eng required')),
      description_ka: Yup.string().required(renderLanguage('აღწერა ქართულად სავალდებულოა', 'Description ka required')),
      description_eng: Yup.string().required(
        renderLanguage('აღწერა ინგლისურად სავალდებულოა', 'Description eng required')
      ),
    }),
    initialValues: {
      title_ka: '',
      title_eng: '',
      description_ka: 'აღწერა ქართულად',
      description_eng: '',
      pdf_ka: '',
      pdf_eng: '',
    },
    onSubmit: async (values) => {
      if (values.description_ka === '<p><br></p>') {
        formik.setFieldError(
          'description_ka',
          renderLanguage('აღწერა ქართულად სავალდებულოა', 'Description ka required')
        );
        return;
      }
      if (values.description_eng === '<p><br></p>') {
        formik.setFieldError(
          'description_eng',
          renderLanguage('აღწერა ინგლისურად სავალდებულოა', 'Description eng required')
        );
        return;
      }

      const data = {
        title_ka: values.title_ka,
        title_eng: values.title_eng,
        description_ka: values.description_ka,
        description_eng: values.description_eng,
        pdf_ka: uploadedKa,
        pdf_eng: uploadedEng,
      };

      const response: AxiosResponse<ResponseInterface<Vacancy>> = await axios.post('/api/vacancies', data);

      if (response.data.success) {
        router.push(paths.dashboard.publishedVacancies);
      }
    },
  });

  console.log('Files:', uploadedEng, uploadedKa);

  const handleUpload = (file: File, language: 'ka' | 'eng') => {
    const storageName = StorageName.PDF;
    const uuid = new Date().getTime().toString();
    const fileRef = ref(storage, `${storageName}/${file.name}${uuid}`);
    const metadata = { contentType: file.type };

    const uploadTask = uploadBytesResumable(fileRef, file, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
          default:
            break;
        }
      },
      (error) => {
        console.error('Upload error:', error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          if (language === 'ka') {
            setUploadedKa({
              url: downloadUrl,
              name: `${file.name}${uuid}`,
              original_name: file.name,
              type: file.type,
            });
          } else {
            setUploadedEng({
              url: downloadUrl,
              name: `${file.name}${uuid}`,
              original_name: file.name,
              type: file.type,
            });
          }
        } catch (error) {
          console.error('Get URL error:', error);
        }
      }
    );
  };

  const handleRemoveFile = async (file: FileInterface, language: 'ka' | 'eng'): Promise<void> => {
    const fileRef = ref(storage, `${StorageName.PDF}/${file.name}`);

    try {
      await deleteObject(fileRef);
      if (language === 'ka') {
        setUploadedKa(undefined);
      } else {
        setUploadedEng(undefined);
      }
      console.log('File has been deleted');
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <Fade in>
      <Stack spacing={3}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack spacing={2}>
            <Box className={styles.boxWrapper}>
              <TextField
                error={Boolean(formik.touched.title_ka && formik.errors.title_ka)}
                helperText={formik.touched.title_ka ? formik.errors.title_ka : null}
                label={renderLanguage('სათაური ქართულად', 'Title ka')}
                name="title_ka"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title_ka}
                fullWidth
                className={styles.input}
              />
              <TextField
                error={Boolean(formik.touched.title_eng && formik.errors.title_eng)}
                helperText={formik.touched.title_eng ? formik.errors.title_eng : null}
                label={renderLanguage('სათაური ინგლისურად', 'Title eng')}
                name="title_eng"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title_eng}
                className={styles.input}
              />
              <TextField
                error={Boolean(formik.touched.description_eng && formik.errors.description_eng)}
                helperText={formik.touched.description_eng ? formik.errors.description_eng : null}
                label={renderLanguage('jobs.ge - ს ლინკი', 'jobs.ge - Link')}
                name="description_eng"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description_eng}
                fullWidth
                className={styles.input}
              />
              {/* <Box sx={{ width: '100%' }}>
                <QuillEditor
                  onChange={async (value: string) => {
                    await formik.setFieldValue('description_ka', value);
                  }}
                  placeholder={renderLanguage('აღწერა ქართულად', 'Description ka')}
                  value={formik.values.description_ka}
                />
                <Typography fontSize="12px" className={styles.helperText}>
                  {formik.errors.description_ka}
                </Typography>
              </Box>

              <Box sx={{ width: '100%' }}>
                <QuillEditor
                  onChange={async (value: string) => {
                    await formik.setFieldValue('description_eng', value);
                  }}
                  placeholder={renderLanguage('აღწერა ინგლისურად', 'Description eng')}
                  value={formik.values.description_eng}
                />
                <Typography fontSize="12px" className={styles.helperText}>
                  {formik.errors.description_eng}
                </Typography>
              </Box> */}

              <Typography sx={{ color: 'white' }}>{renderLanguage('აღწერა', 'Description')}</Typography>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography variant="h6">{renderLanguage('PDF ქართულად', 'PDF in Georgian')}</Typography>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleUpload(file, 'ka');
                    }
                  }}
                />
                {uploadedKa ? (
                  <Box>
                    <Typography>{uploadedKa.original_name}</Typography>
                    <Button onClick={() => handleRemoveFile(uploadedKa, 'ka')}>
                      {renderLanguage('წაშლა', 'Remove')}
                    </Button>
                  </Box>
                ) : null}
              </Box>

              <Box>
                <Typography variant="h6">{renderLanguage('PDF ინგლისურად', 'PDF in English')}</Typography>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleUpload(file, 'eng');
                    }
                  }}
                />
                {uploadedEng ? (
                  <Box>
                    <Typography>{uploadedEng.original_name}</Typography>
                    <Button onClick={() => handleRemoveFile(uploadedEng, 'eng')}>
                      {renderLanguage('წაშლა', 'Remove')}
                    </Button>
                  </Box>
                ) : null}
              </Box>
            </Box>

            <Button type="submit" variant="contained">
              {renderLanguage('დამატება', 'Add')}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Fade>
  );
}
