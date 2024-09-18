import type React from 'react';

import ButtonAppBar from '@/components/app-bar/app-bar';
import Footer from '@/components/footer/footer';
import AboutUs from '@/components/about-us/about-us';

export default function Page(): React.JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <AboutUs />
      <Footer />
    </>
  );
}
