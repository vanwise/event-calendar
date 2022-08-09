interface ProfileIconProps extends SvgProps {
  isActive?: boolean;
}

function ProfileIcon({ isActive, ...props }: ProfileIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill={`var(${isActive ? '--red' : '--gray2'})`}
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z"
      />
      <path
        fill={`var(${isActive ? '--red2' : '--gray3'})`}
        d="M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM17.895 16.553a1 1 0 0 1 0 .894c.008-.017 0 .002 0 .002l-.002.001-.001.003-.004.007-.008.016a1.848 1.848 0 0 1-.09.15 3.282 3.282 0 0 1-.24.327 4.635 4.635 0 0 1-.995.88C15.623 19.452 14.175 20 12 20c-3.685 0-5.234-1.57-5.733-2.288a1.283 1.283 0 0 1-.086-1.309A4.347 4.347 0 0 1 10.069 14h3.695c1.75 0 3.349.988 4.13 2.553Z"
      />
    </svg>
  );
}

export default ProfileIcon;
