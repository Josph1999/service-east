import type React from 'react';

import ButtonAppBar from '@/components/app-bar/app-bar';
import Footer from '@/components/footer/footer';
import Career from '@/components/career/career';

export default function Page(): React.JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <Career />
      <Footer />
    </>
  );
}
