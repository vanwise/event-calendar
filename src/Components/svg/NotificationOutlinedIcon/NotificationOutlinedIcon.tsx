interface NotificationOutlinedIconProps extends SvgProps {
  title?: string;
}

function NotificationOutlinedIcon({
  title,
  ...restProps
}: NotificationOutlinedIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#130F26"
      {...restProps}>
      {title && <title>{title}</title>}
      <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path
          d="M11.996 2.514c-4.434 0-6.36 4.015-6.36 6.67 0 1.984.287 1.4-.811 3.82-1.341 3.448 4.051 4.858 7.171 4.858s8.512-1.41 7.172-4.858c-1.098-2.42-.81-1.836-.81-3.82 0-2.655-1.928-6.67-6.362-6.67Z"
          clipRule="evenodd"
        />
        <path d="M14.306 20.512c-1.294 1.446-3.313 1.463-4.62 0" />
      </g>
    </svg>
  );
}

export default NotificationOutlinedIcon;
