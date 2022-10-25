function AlertIcon(props: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      fill="none"
      stroke="#7A60E9"
      viewBox="0 0 25 24"
      {...props}>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#alert-icon-svg)">
        <path d="M12.25 22c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zM12.25 8v4M12.25 16h.01" />
      </g>
      <defs>
        <clipPath id="alert-icon-svg">
          <path fill="#fff" d="M0 0h24v24H0z" transform="translate(.25)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default AlertIcon;
