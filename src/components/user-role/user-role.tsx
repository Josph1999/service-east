import * as React from 'react';
import { UserRole } from '@/app/enums/enums';
import { Box, Checkbox, Fade, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import InvestorIcon from '../icons/investor-icon';
import RocketIcon from '../icons/rocket-icon';
import styles from './user-role.module.css';

interface UserRoleProps {
  setRole: (value: UserRole | ((prevVar: UserRole) => UserRole)) => void;
  role: UserRole;
}

export default function UserRoleSelect(props: UserRoleProps): React.JSX.Element {
  const { role, setRole } = props;

  const { renderLanguage } = useLanguage();

  return (
    <Fade in>
      <Box display="flex" flexDirection="column" gap="26px">
        <Box
          className={styles.checkBoxWrapper}
          sx={{
            border: `1px solid ${role === UserRole.BUSINESS ? '#635bff' : 'gray'}`,
            backgroundColor: role === UserRole.BUSINESS ? '#fff' : '#f0f0f0', // Change background color based on selection
          }}
          onClick={() => {
            setRole(UserRole.BUSINESS);
          }}
        >
          <Checkbox
            checked={role === UserRole.BUSINESS}
            onChange={() => {
              setRole(UserRole.BUSINESS);
            }}
          />{' '}
          <RocketIcon /> <Typography>{renderLanguage('ბიზნესი', 'Business')}</Typography>
        </Box>
        <Box
          className={styles.checkBoxWrapper}
          sx={{
            border: `1px solid ${role === UserRole.INVESTOR ? '#635bff' : 'gray'}`,
            backgroundColor: role === UserRole.INVESTOR ? '#fff' : '#f0f0f0', // Change background color based on selection
          }}
          onClick={() => {
            setRole(UserRole.INVESTOR);
          }}
        >
          <Checkbox
            checked={role === UserRole.INVESTOR}
            onChange={() => {
              setRole(UserRole.INVESTOR);
            }}
          />{' '}
          <InvestorIcon /> <Typography>{renderLanguage('ინვესტორი', 'Investor')}</Typography>
        </Box>
      </Box>
    </Fade>
  );
}
