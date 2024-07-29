'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import ecomacSrc from '../../../public/assets/Ecomac.png';
import anaxSrc from '../../../public/assets/Anax.png'

export default function Companies(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  return (
    <Box sx={{ padding: '400px 256px' }}>
      <Typography sx={{ fontSize: '32px', fontWeight: 700, fontFeatureSettings: "'case' on" }}>
        {renderLanguage('ერთად მუშაობა გადაწყვეტილებების მიწოდებისთვის', 'Working Together to Deliver Solutions')}
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '25px' }}>
        <Grid item xs={4} sm={4} md={4}>
          <Box
            sx={{
              width: '100%',
              padding: '14px 0px',
              backgroundColor: '#2626',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              cursor: 'pointer',
              overflow: 'hidden', // Ensure no overflow
              '&:hover img': {
                filter: 'none',
              },
              img: {
                filter: 'grayscale(100%)', // Black and white effect
                transition: 'filter 0.3s ease', // Smooth transition
              },
            }}
          >
            <Image src={ecomacSrc} width={170} height={50} alt="Logo" />
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box
            sx={{
              width: '100%',
              padding: '14px 0px',
              backgroundColor: '#2626',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              overflow: 'hidden', // Ensure no overflow
              '&:hover img': {
                filter: 'none',
              },
              img: {
                filter: 'grayscale(100%)', // Black and white effect
                transition: 'filter 0.3s ease', // Smooth transition
              },
            }}
          >
            <Image src={anaxSrc} width={170} height={50} alt="Logo" />
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box
            sx={{
              width: '100%',
              padding: '14px 0px',
              backgroundColor: '#2626',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              overflow: 'hidden', // Ensure no overflow
              '&:hover img': {
                filter: 'none',
              },
              img: {
                filter: 'grayscale(100%)', // Black and white effect
                transition: 'filter 0.3s ease', // Smooth transition
              },
            }}
          >
            <Image src={ecomacSrc} width={170} height={50} alt="Logo" />
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box
            sx={{
              width: '100%',
              padding: '14px 0px',
              backgroundColor: '#2626',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              overflow: 'hidden', // Ensure no overflow
              '&:hover img': {
                filter: 'none',
              },
              img: {
                filter: 'grayscale(100%)', // Black and white effect
                transition: 'filter 0.3s ease', // Smooth transition
              },
            }}
          >
            <Image src={anaxSrc} width={170} height={50} alt="Logo" />
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box
            sx={{
              width: '100%',
              padding: '14px 0px',
              backgroundColor: '#2626',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              overflow: 'hidden', // Ensure no overflow
              '&:hover img': {
                filter: 'none',
              },
              img: {
                filter: 'grayscale(100%)', // Black and white effect
                transition: 'filter 0.3s ease', // Smooth transition
              },
            }}
          >
            <Image src={ecomacSrc} width={170} height={50} alt="Logo" />
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box
            sx={{
              width: '100%',
              padding: '14px 0px',
              backgroundColor: '#2626',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              overflow: 'hidden', // Ensure no overflow
              '&:hover img': {
                filter: 'none',
              },
              img: {
                filter: 'grayscale(100%)', // Black and white effect
                transition: 'filter 0.3s ease', // Smooth transition
              },
            }}
          >
            <Image src={anaxSrc} width={170} height={50} alt="Logo" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
