import React from 'react';

export default function FacebookIcon({
  width = 20,
  height = 21,
}: {
  width?: number;
  height?: number;
}): React.JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 10.3038C20 4.74719 15.5229 0.242676 10 0.242676C4.47715 0.242676 0 4.74719 0 10.3038C0 15.3255 3.65684 19.4879 8.4375 20.2427V13.2121H5.89844V10.3038H8.4375V8.0872C8.4375 5.56564 9.9305 4.1728 12.2146 4.1728C13.3088 4.1728 14.4531 4.36931 14.4531 4.36931V6.84529H13.1922C11.95 6.84529 11.5625 7.6209 11.5625 8.41658V10.3038H14.3359L13.8926 13.2121H11.5625V20.2427C16.3432 19.4879 20 15.3257 20 10.3038Z"
        fill="white"
      />
    </svg>
  );
}
