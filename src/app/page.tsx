import type React from 'react';

import AboutForum from '@/components/about-forum/about-forum';
import ButtonAppBar from '@/components/app-bar/app-bar';
import Footer from '@/components/footer/footer';
// import KeyNotes from '@/components/key-notes/key-notes';
import MainContent from '@/components/main-content/main-content';
import Panels from '@/components/panels/panels';
import SpeakerSlider from '@/components/speaker-slider/speaker-slider';
import SponsorsSection from '@/components/sponsors-section/sponsors-section';
import Subscribe from '@/components/subscribe/subscribe';

export default function Page(): React.JSX.Element {
  return (
    <>
      <ButtonAppBar />
      <MainContent />
      <AboutForum />
      <Panels />
      <SpeakerSlider />
      <SponsorsSection />
      <Subscribe />
      <Footer />
    </>
  );
}
