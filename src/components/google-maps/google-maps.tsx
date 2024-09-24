'use client';

import React from 'react';

export default function GoogleMaps(): React.JSX.Element {
  const iframeCode = `
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186.59646828499007!2d44.76302235024927!3d41.72891113202757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404472e102e66fab%3A0xbf2bcc2b2ca4a90a!2sGreen%20Budapest!5e0!3m2!1sen!2sge!4v1727160894989!5m2!1sen!2sge" width="100%" height="639px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;

  return <div dangerouslySetInnerHTML={{ __html: iframeCode }} />;
}
