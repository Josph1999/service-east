'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { type CreateSponsor } from '@/app/api/sponsors/interfaces/create-sponsor.interface';
import { StorageName } from '@/enums/enums';
import { storage } from '@/firebase/firebase';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Badge, Box, Button, Fade, IconButton, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { type Sponsors } from '@prisma/client';
import axios, { type AxiosResponse } from 'axios';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { paths } from '@/paths';
import { useLanguage } from '@/contexts/language-context';
import UploadIcon from '@/components/icons/upload-icon';

import { type ResponseInterface } from '../speakers/interfaces/response.interface';
import styles from './add-sponsor.module.css';
import { type ImageInterface } from './interfaces/image.interface';

export default function AddSponsorForm(): React.JSX.Element {
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
      link: Yup.string().required(renderLanguage('ლინკი სავალდებულოა', 'Link is required')),
    }),
    initialValues: {
      link: '',
    },
    onSubmit: async (values) => {
      const data: CreateSponsor = {
        link: values.link,
        logo_url: uploadedImage.url,
        image_name: uploadedImage.name,
      };

      const response: AxiosResponse<ResponseInterface<Sponsors>> = await axios.post('/api/sponsors', data);
      if (response.data.success) {
        router.push(paths.dashboard.sponsors);
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
                error={Boolean(formik.touched.link && formik.errors.link)}
                helperText={formik.touched.link ? formik.errors.link : null}
                label={renderLanguage('ლინკი', 'Link')}
                name="link"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.link}
                fullWidth
                className={styles.input}
              />
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
