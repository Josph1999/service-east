'use client';

import type React from 'react';
import { useRouter } from 'next/navigation';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Button, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import { headerLinks } from '../app-bar/links/links';
import LocationIcon from '../icons/location-icon';
import MailIcon from '../icons/mail';
import PhoneIcon from '../icons/phone';
import ServiceEastLogo from '../icons/service-east-logo';
import styles from './footer.module.css';

export default function Footer(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: '#181818',
        padding: { xs: '24px', md: '60px 24px', lg: '185px 256px' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: '40px', md: '50px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '20px', md: '30px', lg: '50px' },
          width: { xs: '100%', md: 'auto' },
        }}
      >
        <ServiceEastLogo />
        <Typography sx={{ color: 'white' }}>
          {renderLanguage(
            'სამრეწველო და საწარმოო დანადგარების სერვისების ლიდერი',
            'Service East Georgia LLC – Leader Service Provider in Service Industry!'
          )}
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: '0px',
            backgroundColor: '#1362FF',
            color: '#fff',
            alignSelf: { xs: 'center', md: 'flex-start' },
          }}
          onClick={() => {
            router.push('/contact');
          }}
        >
          {renderLanguage('დაგვიკავშირდი', 'Submit Request')}
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '10px', md: '20px' },
          width: { xs: '100%', md: 'auto' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Typography fontWeight={700} sx={{ color: 'white', fontSize: { xs: '16px', md: '20px' }, width: '250px' }}>
          Service East Georgia LLC
        </Typography>
        {headerLinks.map((item) => (
          <Typography
            sx={{ color: 'white' }}
            key={item.path}
            onClick={() => {
              router.push(item.path);
            }}
          >
            {renderLanguage(item.name_ka, item.name_eng)}
          </Typography>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '20px', md: '30px' },
          width: { xs: '100%', md: 'auto' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Typography fontWeight={700} sx={{ color: 'white', fontSize: { xs: '16px', md: '20px' } }}>
          {renderLanguage('საკონტაქტო ინფორმაცია:', 'Contact Information:')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PhoneIcon /> <Typography sx={{ color: 'white' }}>{renderLanguage('ტელ:', 'Tel:')} </Typography>
          <Typography sx={{ color: 'white' }}>+995 511 33 33 86</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <MailIcon /> <Typography sx={{ color: 'white' }}>{renderLanguage('მეილი:', 'E-Mail:')} </Typography>
          <Typography sx={{ color: 'white' }}>info@service-east.com </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LocationIcon /> <Typography sx={{ color: 'white' }}>{renderLanguage('მისამართი:', 'Address:')} </Typography>
          <Typography sx={{ color: 'white' }}>
            {renderLanguage(
              'გურამ ფანჯიკიძის 22, ბლოკი ა, ოფისი 7, 0160, თბილისი, საქართველო',
              'Guram Panjikidze Street 22, Block A, Office 7, 0160, Tbilisi, Georgia'
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '284px',
          }}
        >
          <a
            className={styles.smallInfo}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon sx={{ color: 'white', opacity: '50%' }} />
          </a>
          <a
            className={styles.smallInfo}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon sx={{ color: 'white', opacity: '50%' }} />
          </a>
          <a
            className={styles.smallInfo}
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon sx={{ color: 'white', opacity: '50%' }} />
          </a>
        </Box>
      </Box>
    </Box>
  );
}
