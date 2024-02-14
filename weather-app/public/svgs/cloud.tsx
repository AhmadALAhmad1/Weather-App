import * as React from 'react';
const Cloud = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='5rem'
    height='5rem'
    viewBox='0 0 512 512'
    {...props}
  >
    <path
      fill='#80b6cb'
      d='M441.518 268.098c-5.51 0-10.859.682-15.98 1.945a69.167 69.167 0 0 0 1.767-15.489c0-38.123-30.905-69.028-69.028-69.028a68.704 68.704 0 0 0-38.983 12.065c-12.949-49.891-58.284-86.729-112.225-86.729c-64.031 0-115.939 51.908-115.939 115.939c-48.141 0-87.168 39.026-87.168 87.168c0 48.141 39.026 87.168 87.168 87.168h350.388c36.738 0 66.52-29.782 66.52-66.52c0-36.737-29.782-66.519-66.52-66.519'
    />
  </svg>
);
export default Cloud;
