'use client';

import React from 'react';

export default function GoogleMaps(): React.JSX.Element {
  const iframeCode = `
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d372.2434769443441!2d44.7791248!3d41.7216449!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404472d73c136823%3A0x5d9c9aef5cebd45e!2zNzViIOGDm-GDlOGDoOGDkOGDkSDhg5nhg53hg6Hhg6Lhg5Dhg5Xhg5Dhg6Eg4YOl4YOj4YOp4YOQLCDhg5fhg5Hhg5jhg5rhg5jhg6Hhg5ggMDE3OQ!5e0!3m2!1ska!2sge!4v1708857546637!5m2!1ska!2sge" width="100%" height="639px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;

  return <div dangerouslySetInnerHTML={{ __html: iframeCode }} />;
}
