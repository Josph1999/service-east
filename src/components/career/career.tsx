'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';

import { useLanguage } from '@/contexts/language-context';

import DotsIcon from '../icons/dots-icon';
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
        backgroundImage: `url(/assets/DotsBackground.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
          paddingRight: '256px',
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
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
        <DotsIcon />

        <Box>
          <Typography
            component={motion.div}
            variants={fadeInUp}
            sx={{
              fontSize: '24px',
              fontWeight: 700,
              fontFeatureSettings: "'case' on",
              paddingTop: '64px',
              '@media (max-width: 900px)': {
                padding: '0px',
                textAlign: 'center',
              },
            }}
          >
            {renderLanguage(
              'ჩვენი კომპანიის სწრაფვა სრულყოფისკენ ეფუძნება გამოცდილი სპეციალისტებისა და ტალანტების ძიების უწყვეტ პროცესს, რომელიც თავისმხრივ ორიენტირებულია თანაბარმნიშვნელოვანი, კოლეგიალური, დაფასებული და ზრდაზე მიმართული სამუშაო გარემოს შექმნისკენ. ',
              'At the core of our company’s mission is continuous growth, progress, and regional expansion. Every individual within our team drives our success, and we prioritize the well-being and professional development of our colleagues. We are always seeking to attract young talent, mid-level professionals, and seasoned industry veterans to strengthen and diversify our team.'
            )}
          </Typography>
          <Typography
            component={motion.div}
            variants={fadeInUp}
            sx={{
              fontFeatureSettings: "'case' on",
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
              'თუ თვლი რომ მზად ხარ გახდე ჩვენი გუნდის წევრი, გაეცანი გამოქვეყნებულ აქტიურ ვაკანსიებს ან დაგვიკავშირდი ჩვენს საკონტაქტო რეკვიზიტებზე',
              'If you share our vision and goals, and are ready to be part of a dynamic and ambitious organization, we encourage you to reach out to us today!'
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
        {/* https://jobs.ge/ge/?view=jobs&id=582867
        https://jobs.ge/ge/?view=jobs&id=582951 */}
        {/* Electrician
        Technician */}
        {vacancies.length > 0 ? (
          vacancies.map((item) => {
            return (
              <Box
                onClick={() => {
                  window.location.href = item.description_eng
                  // router.push(`/career/${item.id}`);
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
                  marginBottom: '20px',
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
