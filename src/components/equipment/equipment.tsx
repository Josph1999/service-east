'use client';

import React from 'react';
import { useWindowWidth } from '@/helpers/window-width';
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
      title_ka: 'მინერალური წყლები ',
      title_eng: 'Mineral Water ',
      icon: <WaterIcon />,
    },
    {
      id: 2,
      title_ka: 'ალკოჰოლური სასმელები ',
      title_eng: 'Alcohol Beverages',
      icon: <BeerIcon />,
    },
    {
      id: 3,
      title_ka: 'ზეთი',
      title_eng: 'Oil and Food Liquids ',
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
      title_ka: 'რძის ნაწარმი',
      title_eng: 'Diary Products ',
      icon: <MilkIcon />,
    },
    {
      id: 6,
      title_ka: 'ქიმიკატები',
      title_eng: 'Chemicals',
      icon: <ChemicalIcon />,
    },
  ];

  const windowWidth = useWindowWidth();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      style={{
        backgroundColor: '#262626',
        padding: '128px 59px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          width: '100%',
          padding: '0px 256px',
          '@media (max-width: 1500px)': {
            padding: '0px 128px'
          },
          '@media (max-width: 1000px)': {
            padding: '0px 64px'
          },
          '@media (max-width: 800px)': {
            padding: '0px'
          },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '24px', md: '32px' },
            color: 'white',
            fontFeatureSettings: "'case' on",
            marginBottom: '25px',
          }}
        >
          {renderLanguage('ჩვენი გუნდი მზად არის გაგიწიოთ მომსახურება შემდეგ ინდუსტრიებში:', 'Our Team of Experts is Ready to Provide Services in the Following Areas:')}
        </Typography>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title_ka}>
              <motion.div variants={itemVariants}>
                <Card key={item.id} {...item} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
      {windowWidth > 1300 ? (
        <Box sx={{ position: 'absolute', bottom: 350, right: 50 }}>
          <EquipmentIcon />
        </Box>
      ) : null}
    </motion.div>
  );
}
