
import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="6" width="16" height="4" rx="2" />
    <rect x="6" y="10" width="12" height="4" rx="2" />
    <rect x="4" y="14" width="16" height="4" rx="2" />
  </svg>
);
