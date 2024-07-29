'use client';

import type React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import { headerLinks } from '../app-bar/links/links';
import LocationIcon from '../icons/location-icon';
import PhoneIcon from '../icons/phone';
import ServiceEastLogo from '../icons/service-east-logo';
import MailIcon from '../icons/mail';

export default function Footer(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  return (
    <Box
      sx={{
        backgroundColor: '#181818',
        padding: '185px 256px',
        '@media (max-width: 760px)': {
          padding: '24px',
        },
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        <ServiceEastLogo />
        <Typography sx={{ color: 'white' }}>
          {renderLanguage(
            'სამრეწველო აღჭურვილობის გადაწყვეტილებების მიმწოდებელი',
            'Provider of Industrial Equipment Solutions'
          )}
        </Typography>
        <Button variant="contained" sx={{ borderRadius: '0px', backgroundColor: '#1362FF', color: '#fff' }}>
          {renderLanguage('სერვისის მოთხოვნა', 'Request For Service')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography fontWeight={700} sx={{ color: 'white', fontSize: '20px' }}>
          Service East
        </Typography>
        {headerLinks.map((item) => {
          return (
            <Typography sx={{ color: 'white' }} key={item.path}>
              {renderLanguage(item.name_ka, item.name_eng)}
            </Typography>
          );
        })}
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
      <Typography fontWeight={700} sx={{ color: 'white', fontSize: '20px' }}>
          Contact info
        </Typography>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <PhoneIcon /> <Typography sx={{ color: 'white' }}>{renderLanguage('ტელ:', 'Tel:')} </Typography>{' '}
          <Typography sx={{ color: 'white' }}>866-330-4255</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <MailIcon /> <Typography sx={{ color: 'white' }}>{renderLanguage('მეილი:', 'Mail:')} </Typography>{' '}
          <Typography sx={{ color: 'white' }}>info@capelevator.com</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <LocationIcon /> <Typography sx={{ color: 'white' }}>{renderLanguage('მეილი:', 'Mail:')} </Typography>{' '}
          <Typography sx={{ color: 'white' }}>111 Canfield Ave, Suite B11 Randolph, NJ 07869</Typography>
        </Box>
      </Box>
    </Box>
  );
}
