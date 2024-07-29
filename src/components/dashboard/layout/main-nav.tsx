'use client';

import * as React from 'react';
import { Menu, MenuItem } from '@mui/material';
// import LanguageIcon from '@mui/icons-material/Language';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { Language, useLanguage } from '@/contexts/language-context';
import { usePopover } from '@/hooks/use-popover';

import { MobileNav } from './mobile-nav';
import { UserPopover } from './user-popover';
import { useUser } from '@/hooks/use-user';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const userPopover = usePopover<HTMLDivElement>();

  const { changeLanguage, language } = useLanguage();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const {user} = useUser()

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-neutral-950)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <Tooltip title="Search">
              <IconButton>
                <MagnifyingGlassIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Tooltip title="Language">
              <IconButton onClick={handleClick}>
                {language === Language.KA ? (
                  <img
                    src="https://flagcdn.com/24x18/ge.png"
                    srcSet="https://flagcdn.com/48x36/ge.png 2x,
  https://flagcdn.com/72x54/ua.png 3x"
                    width="24"
                    height="18"
                    alt="Georgia"
                  />
                ) : (
                  <img
                    src="https://flagcdn.com/24x18/gb.png"
                    srcSet="https://flagcdn.com/48x36/gb.png 2x,
https://flagcdn.com/72x54/ua.png 3x"
                    width="24"
                    height="18"
                    alt="United kingdom"
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  changeLanguage(Language.KA);
                  handleClose();
                }}
              >
                {' '}
                <img
                  src="https://flagcdn.com/24x18/ge.png"
                  srcSet="https://flagcdn.com/48x36/ge.png 2x,
  https://flagcdn.com/72x54/ua.png 3x"
                  width="24"
                  height="18"
                  alt="Georgia"
                />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  changeLanguage(Language.ENG);
                  handleClose();
                }}
              >
                {' '}
                <img
                  src="https://flagcdn.com/24x18/gb.png"
                  srcSet="https://flagcdn.com/48x36/gb.png 2x,
  https://flagcdn.com/72x54/ua.png 3x"
                  width="24"
                  height="18"
                  alt="United kingdom"
                />
              </MenuItem>
            </Menu>
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src={user?.avatar}
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
