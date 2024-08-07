'use client';

import React from 'react';

export default function GoogleMaps(): React.JSX.Element {
  const iframeCode = `
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1270.5195059762714!2d30.526722!3d50.440374!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf0002d2aed7%3A0x41c584d0b7cfe4eb!2sHorizon%20Office%20Tower!5e0!3m2!1sru!2sua!4v1723016505774!5m2!1sru!2sua" width="100%" height="639px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;

  return <div dangerouslySetInnerHTML={{ __html: iframeCode }} />;
}
