import { SVGProps } from 'react';

interface CalendarIconProps extends SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

function CalendarIcon({ isActive, ...rest }: CalendarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...rest}>
      <path
        fill={`var(${isActive ? '--red' : '--gray2'})`}
        d="M3 8a1 1 0 0 0-1 1v8a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V9a1 1 0 0 0-1-1H3Z"
      />
      <path
        fill={`var(${isActive ? '--red2' : '--gray3'})`}
        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1.1c2.282.463 4 2.481 4 4.9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1 5.002 5.002 0 0 1 4-4.9V3a1 1 0 0 1 1-1Z"
      />
      <path
        fill={`var(${isActive ? '--red2' : '--gray3'})`}
        fillRule="evenodd"
        d="M7 13a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1ZM7 17a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default CalendarIcon;
