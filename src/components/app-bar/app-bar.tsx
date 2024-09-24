'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useWindowWidth } from '@/helpers/window-width';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import { Language, useLanguage } from '@/contexts/language-context';

import ServiceEastLogo from '../icons/service-east-logo';
import MobileNavBar from '../mobile-nav-bar/mobile-nav-bar';

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(252, 252, 252, 0.85)',
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
          <Box
            sx={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box sx={{ display: 'flex', gap: '40px' }}>
              <IconButton
                onClick={() => {
                  setMobileNav(true);
                }}
              >
                <MenuIcon sx={{ color: 'black' }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  router.push('/');
                }}
              >
                <ServiceEastLogo width={windowWidth > 1000 ? 200 : 130} height={windowWidth > 1000 ? 40 : 30} />
              </IconButton>
            </Box>

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
              <IconButton onClick={handleClick} sx={{ color: 'black', fontSize: '16px' }}>
                {language === Language.KA ? 'ქართული' : 'English'}
              </IconButton>
              {windowWidth > 1200 ? (
                <Button
                  variant="contained"
                  sx={{ borderRadius: '0px', backgroundColor: '#1362FF', color: '#fff' }}
                  onClick={() => {
                    router.push('/contact');
                  }}
                >
                  {renderLanguage('დაგვიკავშირდი', 'Submit Request')}
                </Button>
              ) : null}
            </Box>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{ color: 'black' }}
            >
              <MenuItem
                onClick={() => {
                  changeLanguage(Language.KA);
                  handleClose();
                }}
                sx={{ fontSize: '14px' }}
              >
                ქართული
              </MenuItem>
              <MenuItem
                onClick={() => {
                  changeLanguage(Language.ENG);
                  handleClose();
                }}
                sx={{ fontSize: '14px' }}
              >
                English
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
