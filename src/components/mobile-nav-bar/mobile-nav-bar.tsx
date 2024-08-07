'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Divider, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useLanguage } from '@/contexts/language-context';

import { headerLinks } from '../app-bar/links/links';
import ServiceEastLogo from '../icons/service-east-logo';

interface MobileNavBarProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNavBar(props: MobileNavBarProps): React.JSX.Element {
  const { open, onClose } = props;

  const { renderLanguage } = useLanguage();

  const router = useRouter();

  const pathName = usePathname();

  const DrawerList = (
    <Box
      role="presentation"
      sx={{
        width: '250px',
        backgroundColor: '#0A1AAB',
        color: '#fff',
      }}
    >
      <List>
        {' '}
        <IconButton
          onClick={() => {
            router.push('/');
          }}
        >
          <ServiceEastLogo width={200} />
        </IconButton>
        <Box sx={{ borderTop: '1px solid #232C65' }} />
        {headerLinks.map((item) => (
          <ListItem
            key={item.name_ka}
            disablePadding
            onClick={() => {
              router.push(item.path);
            }}
            sx={{ padding: '0px 10px' }}
          >
            <ListItemButton
              sx={{
                borderBottom: pathName === item.path ? '2px solid #232C65' : 'none',
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
                  },
                }}
                primary={renderLanguage(item.name_ka, item.name_eng)}
              />
              <Divider />
            </ListItemButton>
          </ListItem>
        ))}
        <Button
          variant="contained"
          sx={{ borderRadius: '0px', backgroundColor: '#1362FF', color: '#fff' }}
          onClick={() => {
            router.push('/contact');
          }}
        >
          {renderLanguage('სერვისის მოთხოვნა', 'Request For Service')}
        </Button>
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
