import React from 'react';
import Image from 'next/image';

import logoPath from '../../../public/assets/ServiceEastLogo.png';

export default function ServiceEastLogo({ width = 216, height = 40 }: { width?: number; height?: number }): React.JSX.Element {
  return <Image src={logoPath} width={width} height={height} alt="Service East Logo" style={{ filter: 'grayscale(100%)' }}/>;
}
