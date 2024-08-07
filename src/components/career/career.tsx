'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/language-context';

import smalldots from '../../../public/assets/SmallDots.png';
import LinkIcon from '../icons/link-icon';
import { ResponseInterface, Vacancy } from '../interfaces/response.interface';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, duration: 5 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, duration: 5 },
};

export default function Career(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  const router = useRouter();

  const fetchVacancies = useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<Vacancy[]>> = await axios.get(
      `/api/vacancies?page=1&rowsPerPage=50&sortBy=created_at&direction=desc`
    );

    if (response.data.success) {
      setVacancies(response.data.data);
    }
  }, []);

  useEffect(() => {
    fetchVacancies().catch((error: unknown) => {
      console.error('Error in fetchVacancies:', error);
    });
  }, [fetchVacancies]);

  return (
    <Box
      sx={{
        backgroundImage: `url(/assets/Rectangle.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        paddingTop: '100px',
      }}
    >
      <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        sx={{
          marginTop: '60px',
          backgroundColor: '#0A4AEB',
          paddingRight: '256px',
          display: 'flex',
          justifyContent: 'space-around',
          '@media (max-width: 1200px)': {
            paddingRight: '128px',
          },
          '@media (max-width: 900px)': {
            flexDirection: 'column',
            paddingRight: '0px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            marginTop: '0px',
            paddingTop: '90px',
          },
        }}
      >
        <Image width={92} height={106} src={smalldots} alt="Small Dots Image" className="dotsImage" />

        <Box>
          <Typography
            component={motion.div}
            variants={fadeInUp}
            sx={{
              fontSize: '32px',
              fontWeight: 700,
              fontFeatureSettings: "'case' on",
              color: 'white',
              paddingTop: '64px',
              '@media (max-width: 900px)': {
                padding: '0px',
                textAlign: 'center',
              },
            }}
          >
            {renderLanguage(
              'თქვენი კარიერა სამრეწველო აღჭურვილობაში იწყება აქ',
              'Your Career in Industrial Equipment Starts Here'
            )}
          </Typography>
          <Typography
            component={motion.div}
            variants={fadeInUp}
            sx={{
              fontFeatureSettings: "'case' on",
              color: 'white',
              width: '600px',
              paddingTop: '34px',
              paddingBottom: '64px',
              '@media (max-width: 900px)': {
                padding: '0px',
                paddingBottom: '24px',
                width: '100%',
                textAlign: 'center',
              },
            }}
          >
            {renderLanguage(
              'სამრეწველო აღჭურვილობის გადაწყვეტილებები. გლობალური ექსპერტიზა. შეუდარებელი სერვისი',
              'Industrial Equipment Solutions. Global Expertise. Unrivaled Service'
            )}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          padding: { xs: '80px 24px', sm: '80px 64px', md: '90px 128px', lg: '128px 256px' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {vacancies.length > 0 ? (
          vacancies.map((item) => {
            return (
              <Box
                onClick={() => {
                  router.push(`/career/${item.id}`);
                }}
                key={item.id}
                sx={{
                  padding: '24px 64px',
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#1E1E26',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ fontWeight: 600, fontFeatureSettings: "'case' on", color: 'white' }}>
                  {renderLanguage(item.title_ka, item.title_eng)}
                </Typography>
                <LinkIcon />
              </Box>
            );
          })
        ) : (
          <Typography>{renderLanguage('ვაკანსიები არ მოიძებნა', 'Vacancies not found')}</Typography>
        )}
      </Box>
    </Box>
  );
}
