'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { StorageName } from '@/enums/enums';
import { storage } from '@/firebase/firebase';
import { Box, Button, Fade, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { type News } from '@prisma/client';
import axios, { type AxiosResponse } from 'axios';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { paths } from '@/paths';
import { useLanguage } from '@/contexts/language-context';
import FileUpload from '@/components/file-upload/file-upload';
import { QuillEditor } from '@/components/quill-editor/quill-editor';

import { type ImageInterface } from '../add-speaker/interfaces/image.interface';
import { type NewsInterface } from '../published-news/interfaces/news.interface';
import { type ResponseInterface } from '../speakers/interfaces/response.interface';
import styles from './edit-news.module.css';

export default function EditNews(): React.JSX.Element {
  const params = useParams();
  const newsId = params.id as string;
  const { renderLanguage } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ImageInterface[]>([]);

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
      description_ka: '',
      description_eng: '',
      image: '',
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
        images: uploadedImages,
      };

      const response: AxiosResponse<ResponseInterface<News>> = await axios.patch(`/api/news/${newsId}`, data);

      if (response.data.success) {
        router.push(paths.dashboard.publishedNews);
      }
    },
  });

  const handleFetchNews = useCallback(
    async (id: string) => {
      const response: AxiosResponse<ResponseInterface<NewsInterface>> = await axios.get(`/api/news/${id}`);
      if (response.data.success) {
        const images: ImageInterface[] = response.data.data.images.map((img) => {
          return {
            name: img.name,
            original_name: img.original_name,
            type: img.media_type,
            url: img.url,
          };
        });
        await formik.setFieldValue('title_ka', response.data.data.title_ka);
        await formik.setFieldValue('title_eng', response.data.data.title_eng);
        await formik.setFieldValue('description_ka', response.data.data.description_ka);
        await formik.setFieldValue('description_eng', response.data.data.description_eng);
        setUploadedImages(images);
        return;
      }

      router.push('/dashboard/published-news');
    },
    [newsId]
  );

  useEffect(() => {
    if (newsId) {
      handleFetchNews(newsId)
        .then((data) => {
          return data;
        })
        .catch((error: unknown) => error);
    }
  }, [newsId, handleFetchNews]);

  React.useEffect(() => {
    if (files.length) {
      for (const file of files) {
        const storageName = StorageName.NewsImages;

        const uuid = new Date().getTime().toString();

        if (file) {
          const imageRef = ref(storage, `${storageName}/${file.name}${uuid}`);

          const metadata = {
            contentType: file.type,
          };

          const uploadTask = uploadBytesResumable(imageRef, file, metadata);

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
              return error;
            },
            async () => {
              try {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadUrl) => {
                    setUploadedImages((prev) => [
                      ...prev,
                      {
                        url: downloadUrl,
                        name: `${file.name}${uuid}`,
                        original_name: file.name,
                        type: file.type,
                      },
                    ]);
                  })
                  .catch((error: unknown) => {
                    return error;
                  });
              } catch (error) {
                return error;
              }
            }
          );
        }
      }
    }
  }, [files]);

  const handleRemoveImage = async (photo: ImageInterface): Promise<void> => {
    const photoRef = ref(storage, `${StorageName.NewsImages}/${photo.name}`);

    deleteObject(photoRef)
      .then(() => {
        const filteredImages = uploadedImages.filter((image) => image.name !== photo.name);

        setUploadedImages(filteredImages);
        return renderLanguage('ფოტო წარმატებით წაიშალა', 'photo has been deleted');
      })
      .catch((error: unknown) => {
        return error;
      });
  };

  const handleRemoveAll = async (): Promise<void> => {
    for (const image of uploadedImages) {
      await handleRemoveImage(image);
    }
    setUploadedImages([]);
  };

  const handleRemoveNews = () => {
    handleRemoveAll()
      .then((data) => data)
      .catch((error: unknown) => error);
    axios
      .delete(`/api/news/${newsId}`)
      .then((response: AxiosResponse<ResponseInterface<NewsInterface>>) => {
        if (response.data.success) {
          router.push(paths.dashboard.publishedNews);
        }
      })
      .catch((error: unknown) => {
        return error;
      });
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
              <Box sx={{ width: '100%' }}>
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
              </Box>

              <Typography sx={{ color: 'white' }}>{renderLanguage('აღწერა', 'Description')}</Typography>
              <Box display="flex" flexDirection="column">
                <FileUpload
                  setFiles={setFiles}
                  files={files}
                  handleRemoveImage={handleRemoveImage}
                  images={uploadedImages}
                  handleRemoveAll={handleRemoveAll}
                />
              </Box>
            </Box>
            <Button type="submit" variant="contained">
              {renderLanguage('რედაქტირება', 'Edit')}
            </Button>
            <Button variant="contained" color="error" onClick={handleRemoveNews}>
              {renderLanguage('წაშლა', 'Delete')}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Fade>
  );
}
