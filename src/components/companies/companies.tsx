'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { useLanguage } from '@/contexts/language-context';

import anaxSrc from '../../../public/assets/Anax.png';
import ecomacSrc from '../../../public/assets/Ecomac.png';

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export default function Companies(): React.JSX.Element {
  const { renderLanguage } = useLanguage();
  const items = [ecomacSrc, anaxSrc, ecomacSrc, anaxSrc, ecomacSrc, anaxSrc];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box
      sx={{
        padding: { xs: '100px 16px', sm: '150px 24px', md: '200px 32px', lg: '400px 256px' },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '32px' },
          fontWeight: 700,
          fontFeatureSettings: "'case' on",
          textAlign: 'center',
        }}
      >
        {renderLanguage('გახდი ჩვენი პარტნიორი - ერთად შევცვალოთ ხარისხი სტანდარტი ინდუსტრიაში!', 'Become our Partner, Join the Mission of Becoming a Regional Leader!')}
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: '25px' }} ref={ref}>
        {items.map((src, index) => (
          <Grid item xs={6} sm={4} md={4} lg={4} key={index}>
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={itemVariants}
              custom={index} // Pass index for staggered animation
            >
              <Box
                sx={{
                  width: '100%',
                  padding: '14px 0px',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  justifyContent: 'center',
                  // border: '1px solid black',
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
                <Image src={src} width={170} height={50} alt="Logo" />
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
