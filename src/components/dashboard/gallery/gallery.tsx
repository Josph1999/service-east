'use client';

import React from 'react';
import { StorageName } from '@/enums/enums';
import { storage } from '@/firebase/firebase';
import { Box, Fade, Pagination, Stack } from '@mui/material';
import { Media } from '@prisma/client';
import axios, { type AxiosResponse } from 'axios';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { useLanguage } from '@/contexts/language-context';
import FileUpload from '@/components/file-upload/file-upload';

import { type ImageInterface } from '../add-speaker/interfaces/image.interface';
import { type ResponseInterface } from '../speakers/interfaces/response.interface';
import styles from './gallery.module.css';

export default function UploadGallery(): React.JSX.Element {
  const { renderLanguage } = useLanguage();
  const [files, setFiles] = React.useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = React.useState<ImageInterface[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    if (files.length) {
      for (const file of files) {
        const storageName = StorageName.NewsImages;
        const uuid = new Date().getTime().toString();

        if (file) {
          const imageRef = ref(storage, `${storageName}/${file.name}${uuid}`);
          const metadata = { contentType: file.type };
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
                  .then(async (downloadUrl) => {
                    const response: AxiosResponse<ResponseInterface<Media[]>> = await axios.post('/api/media', {
                      media: {
                        url: downloadUrl,
                        name: `${file.name}${uuid}`,
                        original_name: file.name,
                        type: file.type,
                      },
                    });

                    if (response.data.success) {
                      setUploadedImages((prev) => [
                        ...prev,
                        {
                          url: downloadUrl,
                          name: `${file.name}${uuid}`,
                          original_name: file.name,
                          type: file.type,
                        },
                      ]);
                    }
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

  const handleFetchGallery = React.useCallback(async (pageNum: number) => {
    const response: AxiosResponse<ResponseInterface<Media[]>> = await axios.get(
      `/api/media?rowsPerPage=3&page=${pageNum.toString()}&sortBy=created_at&direction=desc`
    );
    if (response.data.success) {
      setUploadedImages(
        response.data.data.map((img) => ({
          url: img.url,
          name: img.name,
          original_name: img.original_name,
          type: img.media_type,
        }))
      );
      setTotalPages(Math.ceil(response.data.count ? response.data.count / 3 : 1 / 3)); // Assuming the response contains a total count of items
    }
  }, []);

  React.useEffect(() => {
    handleFetchGallery(page)
      .then((data) => {
        return data;
      })
      .catch((error: unknown) => error);
  }, [handleFetchGallery, page]);

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

    await axios.delete(`/api/media/${photo.name}`);
  };

  const handleRemoveAll = async (): Promise<void> => {
    for (const image of uploadedImages) {
      await handleRemoveImage(image);
    }
    setUploadedImages([]);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Fade in>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Box className={styles.boxWrapper}>
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
        </Stack>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Stack>
    </Fade>
  );
}
