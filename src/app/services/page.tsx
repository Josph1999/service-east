import type React from 'react';

import ButtonAppBar from '@/components/app-bar/app-bar';
import Footer from '@/components/footer/footer';
import Services from '@/components/services/services';

export default function Page(): React.JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <Services />
      <Footer />
    </>
  );
}
