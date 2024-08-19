'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { useLanguage } from '@/contexts/language-context';

import DotsIcon from '../icons/dots-icon';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export default function TrustedPartner(): React.JSX.Element {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const { renderLanguage } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      style={{ width: '100%',  }} // Ensure the motion div spans the full width
    >
      <Box
        sx={{
          padding: { xs: '64px 24px', md: '64px 256px' },
          backgroundColor: '#F1F7FE',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: '30px',
          '@media (min-width: 1500px)': {
            padding: '64px 128px',
          },
          '@media (max-width: 900px)': {
            marginTop: '150px'
          },
        }}
      >
        <DotsIcon/>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: { xs: 'center', md: 'left' } }}>
          <Typography sx={{ color: 'black', fontSize: { xs: '24px', sm: '32px', md: '40px' }, fontWeight: 700 }}>
            {renderLanguage(
              'Service East: სანდო პარტნიორი მთელ მსოფლიოში',
              'Service East: A Trusted Partner Worldwide'
            )}
          </Typography>
          <Typography sx={{ color: 'black', maxWidth: '700px', margin: { xs: '0 auto', md: '0' } }}>
            {renderLanguage(
              'სერვის ისტი გთავაზობთ აღჭურვილობას სხვადასხვა საქონლის, მათ შორის წყლის, ლუდის, ზეთის, ღვინის, რძის, ქიმიკატებისა და ფარმაცევტული პროდუქტების წარმოებისთვის. მათი საკონტაქტო ინფორმაცია ასევე ჩამოთვლილია ამ განყოფილებაში, მათ შორის მათი მისამართი, ელექტრონული ფოსტის მისამართი და ვებგვერდი.',
              'Service East offers equipment for the production of various goods, including water, beer, oil, wine, milk, chemicals, and pharmaceuticals. Their contact information is also listed in this section, including their address, email address, and website.'
            )}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
