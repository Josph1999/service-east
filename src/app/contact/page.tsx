import type React from 'react';

import ButtonAppBar from '@/components/app-bar/app-bar';
import Footer from '@/components/footer/footer';
import Contact from '@/components/contact/contact';

export default function Page(): React.JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <Contact />
      <Footer />
    </>
  );
}
