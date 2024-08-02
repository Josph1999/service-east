'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useWindowWidth } from '@/helpers/window-width';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { motion, type Variants } from 'framer-motion';

import { Language, useLanguage } from '@/contexts/language-context';

import ServiceEastLogo from '../icons/service-east-logo';
import MobileNavBar from '../mobile-nav-bar/mobile-nav-bar';
import { headerLinks } from './links/links';

const bounceAnimation = {
  hidden: { scale: 1, opacity: 1 },
  visible: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

export default function ButtonAppBar(): React.JSX.Element {
  const { renderLanguage, language, changeLanguage } = useLanguage();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileNav, setMobileNav] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const windowWidth = useWindowWidth();

  const router = useRouter();

  const pathName = usePathname();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          padding: '0px 256px',
          color: '#232C65',
          zIndex: 1000,
          '@media (max-width: 1200px)': {
            padding: '0px 128px',
          },
          '@media (max-width: 1000px)': {
            padding: '0px 64px',
          },
          '@media (max-width: 760px)': {
            padding: '0px 24px',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {windowWidth > 1200 ? (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <IconButton
                onClick={() => {
                  router.push('/');
                }}
              >
                <ServiceEastLogo width={windowWidth > 1200 ? 216 : 35} />
              </IconButton>
            </Box>
          ) : null}
          <Box sx={{ display: 'flex', gap: '20px' }}>
            {windowWidth > 1200 ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                {headerLinks.map((link) => (
                  <Button
                    key={link.path}
                    sx={{
                      color: 'white',
                      borderRadius: '0px',
                      borderBottom: pathName === link.path ? '2px solid #fff' : 'none',
                      fontWeight: pathName === link.path ? 700 : 400,
                    }}
                    onClick={() => {
                      router.push(link.path);
                    }}
                  >
                    {renderLanguage(link.name_ka, link.name_eng)}
                  </Button>
                ))}
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  setMobileNav(true);
                }}
              >
                <MenuIcon sx={{ color: '#232C65' }} />
              </IconButton>
            )}
            {windowWidth <= 1200 ? (
              <IconButton
                onClick={() => {
                  router.push('/');
                }}
              >
                <ServiceEastLogo width={windowWidth > 1200 ? 48 : 35} />
              </IconButton>
            ) : null}
            {windowWidth <= 1200 ? (
              <IconButton onClick={handleClick} sx={{ color: '#232C65', fontSize: '12px' }}>
                {language === Language.KA ? 'KA' : 'ENG'}
              </IconButton>
            ) : null}
            {windowWidth > 1200 ? (
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  '@media (max-width: 1200px)': {
                    width: 'auto',
                  },
                }}
              >
                <motion.div variants={bounceAnimation as unknown as Variants} initial="hidden" animate="visible">
                  <Button variant="contained" sx={{ borderRadius: '0px', backgroundColor: '#1362FF', color: '#fff' }}>
                    {renderLanguage('სერვისის მოთხოვნა', 'Request For Service')}
                  </Button>
                </motion.div>
                <IconButton onClick={handleClick} sx={{ color: '#232C65', fontSize: '12px' }}>
                  {language === Language.KA ? 'KA' : 'ENG'}
                </IconButton>
              </Box>
            ) : null}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{ color: 'white' }}
            >
              <MenuItem
                onClick={() => {
                  changeLanguage(Language.KA);
                  handleClose();
                }}
                sx={{ fontSize: '14px' }}
              >
                KA
              </MenuItem>
              <MenuItem
                onClick={() => {
                  changeLanguage(Language.ENG);
                  handleClose();
                }}
                sx={{ fontSize: '14px' }}
              >
                ENG
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <MobileNavBar
        open={mobileNav}
        onClose={() => {
          setMobileNav(false);
        }}
      />
    </Box>
  );
}
