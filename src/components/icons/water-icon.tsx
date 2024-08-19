import React from 'react';

export default function WaterIcon(): React.JSX.Element {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="64" height="64" fill="url(#pattern0_161_3549)" />
      <defs>
        <pattern id="pattern0_161_3549" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_161_3549" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_161_3549"
          width="100"
          height="100"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
