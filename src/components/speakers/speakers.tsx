'use client';

import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import InfoIcon from '../icons/info-icon';
import SpeakerCard from '../speaker-card/speaker-card';
import { speakerData } from '../speaker-slider/data';

export default function Speakers(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  const [panel, setPanel] = useState('all');

  const handleChange = (event: SelectChangeEvent) => {
    setPanel(event.target.value);
  };

  return (
    <Box
      sx={{
        padding: '184px 256px',
        backgroundImage: `url(/assets/MainBackground.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        '@media (max-width: 1200px)': {
          padding: '90px 128px',
        },
        '@media (max-width: 1000px)': {
          padding: '80px 64px',
        },
        '@media (max-width: 760px)': {
          padding: '80px 24px',
        },
      }}
    >
      <Typography fontWeight={700} fontSize="24px">
        {renderLanguage('სპიკერები', 'Speakers')}
      </Typography>
      <Box sx={{ display: 'flex', gap: '12px' }}>
        <InfoIcon />
        <Typography
          sx={{
            color: '#232C65',
            '@media (max-width: 1200px)': {
              fontSize: '12px',
            },
          }}
        >
          {renderLanguage(
            'თქვენ შეგიძლიათ ნახოთ სამივე პანელის ყველა დინამიკა',
            'You can see all speakers of all three panels'
          )}
        </Typography>
      </Box>
      <Box sx={{ minWidth: 120, width: '200px' }}>
        <FormControl sx={{ width: '200px' }}>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={panel} onChange={handleChange}>
            <MenuItem value="all">{renderLanguage('ყველა სპიკერი', 'All Speakers')}</MenuItem>
            {speakerData.map((item) => (
              <MenuItem value={item.panel_eng} key={item.id}>
                <Typography>{renderLanguage(item.panel_ka, item.panel_eng)}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {speakerData
            .filter((item) => {
              if (panel === 'all') return true;
              return item.panel_eng === panel;
            })
            .map((speaker) => (
              <Grid item xs={12} sm={6} md={4} key={speaker.id}>
                <SpeakerCard item={speaker} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
