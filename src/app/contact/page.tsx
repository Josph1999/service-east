import type React from 'react';

import ButtonAppBar from '@/components/app-bar/app-bar';
import Contact from '@/components/contact/contact';
import Footer from '@/components/footer/footer';

export default function Page(): React.JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <Contact />
      <Footer />
    </>
  );
}
