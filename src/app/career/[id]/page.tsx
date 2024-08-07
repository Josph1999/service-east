import type React from 'react';

import ButtonAppBar from '@/components/app-bar/app-bar';
import Footer from '@/components/footer/footer';
import CareerDetails from '@/components/career-details/career-details';

export default function Page(): React.JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <CareerDetails />
      <Footer />
    </>
  );
}
