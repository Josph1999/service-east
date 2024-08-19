'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useWindowWidth } from '@/helpers/window-width';
import { Button, Divider, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useLanguage } from '@/contexts/language-context';

import { headerLinks } from '../app-bar/links/links';
import CloseIcon from '../icons/close-icon';
import ServiceEastLogo from '../icons/service-east-logo';

interface MobileNavBarProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNavBar(props: MobileNavBarProps): React.JSX.Element {
  const { open, onClose } = props;

  const { renderLanguage } = useLanguage();

  const windowWidth = useWindowWidth();

  const router = useRouter();

  const pathName = usePathname();

  const DrawerList = (
    <Box
      role="presentation"
      sx={{
        backgroundColor: 'white',
        color: '#fff',
        padding: '20px',
      }}
    >
      <List>
        {' '}
        <Box sx={{ display: 'flex', gap: '60px', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              router.push('/');
            }}
          >
            <ServiceEastLogo width={windowWidth > 1000 ? 200 : 130} height={windowWidth > 1000 ? 40 : 30} />
          </IconButton>
          <Box>
            <Button
              variant="outlined"
              sx={{
                color: 'black',
                borderRadius: '0px',
                borderColor: 'black',
                width: '180px',
                '@media (max-width: 1000px)': {
                  width: '100px'
                },
              }}
              endIcon={<CloseIcon />}
              onClick={onClose}
            >
              {renderLanguage('დახურვა', 'Close')}
            </Button>
          </Box>
        </Box>
        {headerLinks.map((item) => (
          <ListItem
            key={item.name_ka}
            disablePadding
            onClick={() => {
              router.push(item.path);
            }}
            sx={{ padding: '0px 10px', marginTop: '30px' }}
          >
            <ListItemButton
              sx={{
                borderLeft: pathName === item.path ? '1px solid #232C65' : 'none',
                fontFeatureSettings: "'case' on",
                textTransform: 'uppercase',
              }}
            >
              <ListItemText
                sx={{
                  '& span': {
                    fontWeight: pathName === item.path ? 700 : 400,
                    fontFeatureSettings: "'case' on",
                    textTransform: 'uppercase',
                    color: 'black',
                  },
                }}
                primary={renderLanguage(item.name_ka, item.name_eng)}
              />
              <Divider />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={open}
        onClose={onClose}
        sx={{
          backgroundImage: `url(/assets/MainBackground.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
