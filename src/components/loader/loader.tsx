import React from 'react';

import styles from './loader.module.css';
import ServiceEastLogo from '../icons/service-east-logo';

export default function Loader(): React.JSX.Element {
  return (
    <svg className={styles.loaderSvg} viewBox="0 0 1320 300">
      <g transform="translate(620, -60)">
        <ServiceEastLogo width={100} height={100} />
      </g>
      <text className={styles.loaderText} x="50%" y="50%" dy=".35em" textAnchor="middle">
        Service East
      </text>
    </svg>
  );
}
