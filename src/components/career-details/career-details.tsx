'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';
import parser from 'html-react-parser';

import { useLanguage } from '@/contexts/language-context';

import smalldots from '../../../public/assets/SmallDots.png';
import CareerBackIcon from '../icons/career-back-icon';
import { ResponseInterface, Vacancy } from '../interfaces/response.interface';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, duration: 5 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, duration: 5 },
};

export default function CareerDetails(): React.JSX.Element {
  const { renderLanguage, language } = useLanguage();

  const params = useParams();
  const vacancyId = params.id as string;

  const router = useRouter();

  const [vacancy, setVacancy] = useState<Vacancy>();

  const fetchVacancy = useCallback(async (): Promise<void> => {
    const response: AxiosResponse<ResponseInterface<Vacancy>> = await axios.get(`/api/vacancies/${vacancyId}`);

    if (response.data.success) {
      setVacancy(response.data.data);
    } else {
      router.push('/');
    }
  }, [vacancyId]);

  useEffect(() => {
    fetchVacancy().catch((error: unknown) => {
      console.error('Error in fetchVacancies:', error);
    });
  }, [vacancyId, fetchVacancy]);

  return (
    <Box
      sx={{
        backgroundImage: `url(/assets/Rectangle.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'top',
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
          padding: '64px 0px',
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
        <Box>
          <Button
            variant="contained"
            startIcon={<CareerBackIcon />}
            sx={{ backgroundColor: '#fff', borderRadius: '0px', color: '#0A4AEB' }}
            onClick={() => {
              router.push('/career');
            }}
          >
            {renderLanguage('კარიერა', 'Back To Career')}
          </Button>
          <Typography
            component={motion.div}
            variants={fadeInUp}
            sx={{
              fontSize: '32px',
              fontWeight: 700,
              fontFeatureSettings: "'case' on",
              color: 'white',
              paddingTop: '34px',
              '@media (max-width: 900px)': {
                padding: '0px',
                textAlign: 'center',
              },
            }}
          >
            {renderLanguage(vacancy ? vacancy.title_ka : '', vacancy ? vacancy.title_eng : '')}
          </Typography>
        </Box>
        <Image width={92} height={106} src={smalldots} alt="Small Dots Image" className="dotsImage" />
      </Box>
      <Box
        sx={{
          padding: { xs: '80px 24px', sm: '80px 64px', md: '90px 128px', lg: '128px 256px' },
        }}
      >
        {parser(renderLanguage(vacancy ? vacancy.description_ka : '', vacancy ? vacancy.description_eng : ''))}
        <Box>
          {vacancy?.files.length && vacancy?.files.find((file) => file.lang === language.toLocaleLowerCase()) ? (
            <Button variant="contained" fullWidth>
              <a
                href={vacancy?.files.find((file) => file.lang === language.toLocaleLowerCase())?.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {renderLanguage('PDF ვერსია', 'PDF Version')}
              </a>
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
