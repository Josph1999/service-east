import React from 'react';

export default function GreenDotIcon({
  width = 9,
  height = 9,
  fill = '#108554',
}: {
  width?: number;
  fill?: string;
  height?: number;
}): React.JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4.5" cy="4.5" r="4" fill={fill} />
    </svg>
  );
}
