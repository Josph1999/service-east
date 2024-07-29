'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import GoogleMaps from '../google-maps/google-maps';
import DirectionIcon from '../icons/direction';
import MailIcon from '../icons/mail';
import PhoneIcon from '../icons/phone';
import Subscribe from '../subscribe/subscribe';

export default function Contact(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  return (
    <>
      <Box
        sx={{
          padding: '128px',
          '@media (max-width: 800px)': {
            padding: '20px',
            marginTop: '120px',
          },
        }}
      >
        <Typography sx={{ fontFeatureSettings: "'case' on" }} fontSize={32}>
          {renderLanguage('კონტაქტი', 'Contact')}
        </Typography>
        <Typography sx={{ fontFeatureSettings: "'case' on" }}>
          {renderLanguage(
            'ინფორმაციის მისაღებად ან ნებისმიერ სხვა საკითხთან დაკავშირებით, დაგვიკავშირდით: ',
            'For information or any other matter, contact us:'
          )}
        </Typography>
        <Box
          marginTop={5}
          marginBottom={5}
          sx={{
            display: 'flex',
            gap: '20px',
            '@media (max-width: 800px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Button
            fullWidth
            sx={{
              borderBottom: '1px solid #232C65',
              borderRadius: '0px',
              color: '#232C65',
            }}
          >
            <a
              href="tel:+995595330057"
              style={{
                color: '#4338CA',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Box
                sx={{
                  color: '#4338CA',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  '@media (max-width: 800px)': {
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  },
                }}
              >
                <PhoneIcon /> (+995) 595 33 00 57
              </Box>
            </a>
          </Button>
          <Button
            fullWidth
            sx={{
              borderBottom: '1px solid #232C65',
              borderRadius: '0px',
              textTransform: 'none',
              color: '#232C65',
            }}
          >
            <a
              style={{
                color: '#4338CA',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
              href="/"
            >
              <Box
                sx={{
                  color: '#4338CA',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  '@media (max-width: 800px)': {
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  },
                }}
              >
                {' '}
                <DirectionIcon />{' '}
                {renderLanguage(
                  'მერაბ კოსტავას ქუჩა, 75ბ, 0112, თბილისი, საქართველო',
                  '75B, Merab Kostava Street, 0112, Tbilisi, Georgia'
                )}
              </Box>
            </a>
          </Button>
          <Button
            fullWidth
            sx={{
              borderBottom: '1px solid #232C65',
              borderRadius: '0px',
              textTransform: 'none',
              color: '#232C65',
            }}
          >
            <a
              href="mailto:info@act.org.ge"
              style={{
                color: '#4338CA',
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Box
                sx={{
                  color: '#4338CA',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  '@media (max-width: 800px)': {
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  },
                }}
              >
                <MailIcon /> Info@act.org.ge
              </Box>
            </a>
          </Button>
        </Box>
        <GoogleMaps />
      </Box>
      <Subscribe />
    </>
  );
}
