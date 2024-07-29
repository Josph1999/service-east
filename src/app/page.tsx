import type React from 'react';
import { Box } from '@mui/material';

import ButtonAppBar from '@/components/app-bar/app-bar';
import KeyConcepts from '@/components/key-concepts/key-concepts';
import MainContent from '@/components/main-content/main-content';
import TrustedPartner from '@/components/trusted-partner/trusted-partner';
import WhatWeOffer from '@/components/what-we-offer/what-we-offer';
import Equipment from '@/components/equipment/equipment';
import Footer from '@/components/footer/footer';
import Companies from '@/components/companies/companies';

export default function Page(): React.JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <MainContent />
      <TrustedPartner />
      <KeyConcepts />
      <Box
        sx={{
          backgroundImage: `url(/assets/TechBack.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
          backgroundSize: 'contain',
        }}
      >
        <WhatWeOffer />
        <Equipment />
        <Companies />
      </Box>
      <Footer/>
    </>
  );
}
