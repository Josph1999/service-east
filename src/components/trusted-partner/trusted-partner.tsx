'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

import { useLanguage } from '@/contexts/language-context';

import smalldots from '../../../public/assets/SmallDots.png';

export default function TrustedPartner(): React.JSX.Element {
  const { renderLanguage } = useLanguage();

  return (
    <Box
      sx={{
        padding: '0px 256px 64px 100px',
        backgroundColor: '#0A4AEB',
        display: 'flex',
        gap: '30px',
      }}
    >
      <Image width={92} height={106} src={smalldots} alt="Small DotsImage" />
      <Box sx={{ display: 'flex', paddingTop: '64px', gap: '30px', alignItems: 'center' }}>
        <Typography sx={{ color: '#fff', fontSize: '40px', fontWeight: 700 }}>
          {renderLanguage('Service East: სანდო პარტნიორი მთელ მსოფლიოში', 'Service East: A Trusted Partner Worldwide')}
        </Typography>
        <Typography sx={{ color: '#C9C9C9', width: '700px' }}>
          {renderLanguage(
            'სერვის ისტი გთავაზობთ აღჭურვილობას სხვადასხვა საქონლის, მათ შორის წყლის, ლუდის, ზეთის, ღვინის, რძის, ქიმიკატებისა და ფარმაცევტული პროდუქტების წარმოებისთვის. მათი საკონტაქტო ინფორმაცია ასევე ჩამოთვლილია ამ განყოფილებაში, მათ შორის მათი მისამართი, ელექტრონული ფოსტის მისამართი და ვებგვერდი.',
            'Service East offers equipment for the production of various goods, including water, beer, oil, wine, milk, chemicals, and pharmaceuticals. Their contact information is also listed in this section, including their address, email address, and website.'
          )}
        </Typography>
      </Box>
    </Box>
  );
}
