'use client';

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { useLanguage } from '@/contexts/language-context';

import BeerIcon from '../icons/beer-icon';
import ChemicalIcon from '../icons/chemical-icon';
import EquipmentIcon from '../icons/equipment-icon';
import MilkIcon from '../icons/milk-icon';
import OilIcon from '../icons/oil-icon';
import WaterIcon from '../icons/water-icon';
import WineIcon from '../icons/wine-icon';
import Card from './card/card';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Equipment(): React.JSX.Element {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { renderLanguage } = useLanguage();

  const data = [
    {
      id: 1,
      title_ka: 'წყალი',
      title_eng: 'Water',
      icon: <WaterIcon />,
    },
    {
      id: 2,
      title_ka: 'ლუდი',
      title_eng: 'Beer',
      icon: <BeerIcon />,
    },
    {
      id: 3,
      title_ka: 'ზეთი',
      title_eng: 'Oil',
      icon: <OilIcon />,
    },
    {
      id: 4,
      title_ka: 'ღვინო',
      title_eng: 'Wine',
      icon: <WineIcon />,
    },
    {
      id: 5,
      title_ka: 'რძე',
      title_eng: 'Milk',
      icon: <MilkIcon />,
    },
    {
      id: 6,
      title_ka: 'ქიმიკატები',
      title_eng: 'Chemical',
      icon: <ChemicalIcon />,
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      style={{ backgroundColor: '#262626', padding: '128px 59px 128px 256px', display: 'flex', justifyContent: 'space-around', marginTop: '250px' }}
    >
      <Box>
        <Typography sx={{ fontSize: '32px', color: 'white', fontFeatureSettings: "'case' on" }}>
          {renderLanguage('მორგებული აღჭურვილობა თქვენი ინდუსტრიისთვის', 'Tailored Equipment for Your Industry')}
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: '25px' }}>
          {data.map((item) => (
            <Grid item xs={4} sm={4} md={4} key={item.title_ka}>
              <motion.div variants={itemVariants}>
                <Card key={item.id} {...item} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
      <EquipmentIcon />
    </motion.div>
  );
}
