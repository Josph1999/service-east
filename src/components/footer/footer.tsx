'use client';

import type React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import { headerLinks } from '../app-bar/links/links';
import FacebookIcon from '../icons/facebook-icon';
import InstaIcon from '../icons/insta-icon';
import LinkedInIcon from '../icons/linkedin-icon';
import TwitterIcon from '../icons/twitter-icon';
import ServiceEastLogo from '../icons/service-east-logo';

export default function Footer(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: '#232C65',
        padding: '80px',
        '@media (max-width: 760px)': {
          padding: '24px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          '@media (max-width: 1000px)': {
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '16px',
          },
        }}
      >
        <ServiceEastLogo />
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            '@media (max-width: 800px)': {
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          {headerLinks.map((item) => {
            return (
              <Typography
                key={item.name_ka}
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  '@media (max-width: 1000px)': {
                    fontSize: '12px',
                  },
                }}
                onClick={() => {
                  router.push(item.path);
                }}
              >
                {renderLanguage(item.name_ka, item.name_eng)}
              </Typography>
            );
          })}
        </Box>
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <a href="https://www.facebook.com/profile.php?id=61556407674820" target="_blank" rel="noreferrer">
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/act_georgia/?fbclid=IwAR0OeB3z_TTq3EzfdwWiE2xA76yzpjRcXhMar_ASzpYZa4pYelhnWrTNVFg"
            target="_blank"
            rel="noreferrer"
          >
            <InstaIcon />
          </a>
          <a
            href="https://twitter.com/act_georgia_?fbclid=IwAR2ugXoF6o7JVa0iuqNPiqxHwwRd2zgm60uAWcqWozXTpiBphB_kvaJawf"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </a>
          <a href="https://www.linkedin.com/company/actgeorgia/about/" target="_blank" rel="noreferrer">
            <LinkedInIcon />
          </a>
        </Box>
      </Box>
      <Box sx={{ width: '100%', border: '1px solid #FCFCFC', margin: '50px 0px' }} />
      <Typography
        sx={{
          color: 'white',
          textAlign: 'center',
          '@media (max-width: 1000px)': {
            fontSize: '12px',
          },
        }}
      >
        {renderLanguage(`© 2024 ACT Georgia. ყველა უფლება დაცულია.`, `© 2024 ACT Georgia. All rights reserved.`)}
      </Typography>
    </Box>
  );
}
