import React from 'react';

export default function BeerIcon(): React.JSX.Element {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="64" height="64" fill="url(#pattern0_161_3550)" />
      <defs>
        <pattern id="pattern0_161_3550" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_161_3550" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_161_3550"
          width="100"
          height="100"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+klEQVR4nO2dbYwdUxjHf6WoqMUHabcrKgSRECFBQ5QilpoVtUpq6/VDqZRFK9IKWon0RlSDSKR88N4GLVHbrS9IV2u1Eja1VhRdKt5i21WlttWOnOS5yc3ae+85c2fOnJl7/sk/aZo7c889v51znvOclwEvLy8vLy8vLy8vLy+vkXQUcCUwH3gWWA68CDwFzAYmAQeOeKVXbDoUuBVYB/wLhFW8HVgGnOkZxKuDgHuAXzQglPM7wEkeTO06HdhcA4hS7xawXsAhwGRgJnAvcD8wB2gGji5TQ21SiWHMfhkYXeY7G6VvurukjK3AqXmheCGwEvizQgXtA7qlfxgtfhjYnwCMolcAY0rKeT7wgZSl3DX9wFKgiQzqBGBthIoaAAYTBBGW+GvgeQkSTOD/DSwGDiYjUn9tv1mq1DBFfwSMw3FdDOyxWCmDUjGrgA+BHy1D6QOOxOFmasBSRXRJQKBC4uE6A3ipSn8Qp9e4OgiN0meYeg9wh0HT+aslKLfgmKZY+NHbgYsMy3WcdN5Jl+37YVFb6lqpWfB9Ej5+q5n+CMWqfzgxYtlUx/ueYQWrpvcbwyfsOhwa9FUaZxT99LCo5BSJ638q8/khoFMGaqNiKOd0CQAqNYdvAVOHDRzPBjZpDjid0AWaMKo1LZcDM4BpwHmSTExCTTL6bpfR+CyJDg+rcE2DPNWVfuPPOKKZGs2U8/G6huZU+Z37pbVIXfOqFHQr+dA5Gi3BRBzQXA8Ep4C01UmTdWdWmqzJGo/yM2RbR0jTm4lOXf1V7NSEMp7saRLwaZbCXpOBYXF8sUsywpvlx0ZxlyQVC8AlVZqLMfKZglzTVeG+W4Adkmbfa/C7rsUh6YxFkvYA8KA0L0WpTOxDFpKe/a70H6Va4wCUUBZDXCFPhK10/E04qOOB3x0AEkrEk+QUcKnfBQ7AUU0xTBpm3X/INPB9wGXAWBzUQgcqKkzJKkHZAVzj0lMz3YGKCR3wV0ALDsgD4X9LjhpcB9Ij66DeqMEdEaOobXJtufu+LevEfoh5McREl4EEMblFFjToVswLco3OvQsxN2Hb0oJiE0gg7tf4zu8M71lIqF9pqAcgGzW+s9sBIKHsZck9kE0a37kxASAqO/FFhEFokHcgfRrf2ZsAkKImyG6uHZpA+myOU2wDadFc9bLToEM3BVLUuCorW0rdmlcgsw2aitsSBlJM9a/XuLYjr0CeNACyxAIQZCJuUCPNMjaPQNYZAHnfEhClBRrXN+cNSKvhtjc1C3i1JSATNKKveXkDssQARtGPWwKChMSpL/6wBaRFc4Q+3Fs1o604gHS6sDDCFpBHIsAoeqElIGvrCUhPDUA+twSkt16arBtrnDNX196QMJAmjTLOzQuQBTXAKHp+wkAeqKewd1EMQBYlCKRRY2A4VGVPSqaAtMcA5K4EUycbNK5dbQOGLSBXaSYUy3mX3CNuII2aMEIZoOYGSFDjNuxOjfubAGmSPkP3WJAv85h+vxn4JwKM3bL0M64Jqt4IEZ/aWGpNNlMniw0rQ332sZSncF+1CcM2kAB4QvN8laEE0u+mVk3V4XkHEsgkVXeZ803U/30M3G54zySWAR1rG0ZaQAJxm1Tkc2L17+sj3qsQ85ORCoy0gQQxuhBjn2G9mfJAGPGpsBpNeSCMGDislkFfprYj5KXJekVS6Goq9lJbuSlT1ROQTMgDcUweiGPyQByTB+KYPBDH5IE4Jg/EMXkgjskDcUweiGPyQBxToJEDmuZAriqocauD2muSCZ2lAaTdgQoPqvhNjYMIMqGmmLeWBSl4hsYaK3VuY2a0RQPKKtmSFjjmWXIERrXyP0qGtFRzvvkv4DP5a0vb6+VdI7pv5lHHx2ZGp1l85VCYgntcmqLVlcmxSVnzVDKoY2p8f23oqFX0lVmdG3FBtKvuTfu4vjjUbHBKjsveIPs/ciH16uxPHKjUMIL3yiubnDtKvFaNkgVk3RZPnQ5r3GX1GnAydaDxsuFGbbxcBrzugFfIyULz5QVlTr2X0MvLy8vLy8vLy8vLC0v6D7zCeN6aAd0zAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}
