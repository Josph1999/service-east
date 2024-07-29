'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { type Media } from '@prisma/client';
import axios, { type AxiosResponse } from 'axios';

import { type ImageInterface } from '../dashboard/add-speaker/interfaces/image.interface';
import { type ResponseInterface } from '../dashboard/speakers/interfaces/response.interface';

export default function Gallery(): React.JSX.Element {
  const [uploadedImages, setUploadedImages] = useState<ImageInterface[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFetchGallery = useCallback(async (pageNum: number) => {
    const response: AxiosResponse<ResponseInterface<Media[]>> = await axios.get(
      `/api/media?rowsPerPage=10&page=${pageNum.toString()}&sortBy=created_at&direction=desc`
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
      setTotalPages(Math.ceil(response.data.count ? response.data.count / 10 : 1 / 3));
    }
  }, []);

  useEffect(() => {
    handleFetchGallery(page)
      .then((data) => {
        return data;
      })
      .catch((error: unknown) => error);
  }, [handleFetchGallery, page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Box
      sx={{
        padding: '184px 256px',
        backgroundImage: `url(/assets/MainBackground.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '@media (max-width: 1200px)': {
          padding: '90px 128px',
        },
        '@media (max-width: 1000px)': {
          padding: '80px 64px',
        },
        '@media (max-width: 760px)': {
          padding: '80px 24px',
        },
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {uploadedImages.length > 0 ? (
          <Grid container spacing={2}>
            {uploadedImages.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.name}>
                <img src={image.url} alt={image.name} style={{ width: '100%', height: '430px', objectFit: 'cover' }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>იტვირთება...</Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          variant="outlined"
        />
      </Box>
    </Box>
  );
}
