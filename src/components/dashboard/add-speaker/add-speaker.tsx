'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type CreateSpeaker } from '@/app/api/speakers/interfaces/create-speaker.interface';
import { StorageName } from '@/enums/enums';
import { storage } from '@/firebase/firebase';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Badge, Box, Button, Fade, IconButton, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { type Speaker } from '@prisma/client';
import axios, { type AxiosResponse } from 'axios';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { paths } from '@/paths';
import { useLanguage } from '@/contexts/language-context';
import UploadIcon from '@/components/icons/upload-icon';

import { type ResponseInterface } from '../speakers/interfaces/response.interface';
import styles from './add-speaker.module.css';
import { type ImageInterface } from './interfaces/image.interface';

export default function AddSpeakerForm(): React.JSX.Element {
  const { renderLanguage } = useLanguage();
  const [uploadedImage, setUploadedImage] = React.useState<ImageInterface>({
    url: '',
    name: '',
    original_name: '',
    type: '',
  });
  const [percentage, setPercentage] = React.useState<number>(0);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();

  const formik = useFormik({
    validationSchema: Yup.object({
      name_ka: Yup.string().required(renderLanguage('სახელი ქართულად სავალდებულოა', 'Name ka required')),
      name_eng: Yup.string().required(renderLanguage('სახელი ინგლისურად სავალდებულოა', 'Name eng required')),
      position_ka: Yup.string().required(renderLanguage('პოზიცია ქართულად სავალდებულოა', 'Position ka required')),
      position_eng: Yup.string().required(renderLanguage('პოზიცია ინგლისურად სავალდებულოა', 'Position eng required')),
    }),
    initialValues: {
      name_ka: '',
      name_eng: '',
      position_ka: '',
      position_eng: '',
      image: '',
    },
    onSubmit: async (values) => {
      const data: CreateSpeaker = {
        name_ka: values.name_ka,
        name_eng: values.name_eng,
        position_ka: values.position_ka,
        position_eng: values.position_eng,
        image_name: uploadedImage.name,
        image_original_name: uploadedImage.original_name,
        media_type: uploadedImage.type,
        url: uploadedImage.url,
      };

      const response: AxiosResponse<ResponseInterface<Speaker>> = await axios.post('/api/speakers', data);
      if (response.data.success) {
        router.push(paths.dashboard.speakers);
      }
    },
  });

  const handleChoose = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleUploadImage = async (file: File): Promise<void> => {
    const storageName = StorageName.SpeakerImages;

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
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
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
                setUploadedImage({
                  url: downloadUrl,
                  name: `${file.name}${uuid}`,
                  original_name: file.name,
                  type: file.type,
                });
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
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const uploadedFile: File | null = event.target.files?.[0] || null;

    if (uploadedFile) {
      await handleUploadImage(uploadedFile);
      await formik.setFieldValue('image', uploadedImage.url);
    }
  };

  const handleRemoveImage = async (): Promise<void> => {
    if (!uploadedImage.name) {
      return;
    }

    const photoRef = ref(storage, `${StorageName.SpeakerImages}/${uploadedImage.name}`);

    deleteObject(photoRef)
      .then(() => {
        setUploadedImage({ url: '', name: '', original_name: '', type: '' });
        return renderLanguage('ფოტო წარმატებით წაიშალა', 'photo has been deleted');
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
              <Box display="flex" flexDirection="column">
                <Badge
                  badgeContent={
                    <IconButton onClick={handleRemoveImage}>
                      <CloseIcon />
                    </IconButton>
                  }
                >
                  <Avatar sx={{ width: '150px', height: '150px' }} src={uploadedImage.url} />
                </Badge>
                <Typography>
                  {percentage === 100 || percentage === null ? null : `${percentage.toString()} %`}
                </Typography>
                <input
                  ref={inputRef}
                  className={styles.uploadInput}
                  type="file"
                  onChange={handleFileChange}
                  accept=".mov,.mp4, .jpeg, .png, .jpg"
                  style={{ display: 'none' }}
                />
                {uploadedImage.name ? null : (
                  <Button
                    variant="contained"
                    onClick={handleChoose}
                    startIcon={<UploadIcon />}
                    className={styles.uploadButton}
                  >
                    {renderLanguage('ატვირთვა', 'Upload')}
                  </Button>
                )}
                <Typography>{renderLanguage('არასავალდებულო', 'Optional')}</Typography>
              </Box>
              <TextField
                error={Boolean(formik.touched.name_ka && formik.errors.name_ka)}
                helperText={formik.touched.name_ka ? formik.errors.name_ka : null}
                label={renderLanguage('სახელი ქართულად', 'Name ka')}
                name="name_ka"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name_ka}
                fullWidth
                className={styles.input}
              />
              <TextField
                error={Boolean(formik.touched.name_eng && formik.errors.name_eng)}
                helperText={formik.touched.name_eng ? formik.errors.name_eng : null}
                label={renderLanguage('სახელი ინგლისურად', 'Name eng')}
                name="name_eng"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name_eng}
                className={styles.input}
              />
              <TextField
                error={Boolean(formik.touched.position_ka && formik.errors.position_ka)}
                helperText={formik.touched.position_ka ? formik.errors.position_ka : null}
                label={renderLanguage('პოზიცია ქართულად', 'Position ka')}
                name="position_ka"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.position_ka}
                className={styles.input}
              />
              <TextField
                error={Boolean(formik.touched.position_eng && formik.errors.position_eng)}
                helperText={formik.touched.position_eng ? formik.errors.position_eng : null}
                label={renderLanguage('პოზიცია ინგლისურად', 'Position eng')}
                name="position_eng"
                fullWidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.position_eng}
                className={styles.input}
              />

              <Typography sx={{ color: 'white' }}>{renderLanguage('აღწერა', 'Description')}</Typography>
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
