import type { FunctionComponent } from 'react';

type Props = {
  color?: string
};

const IconEye: FunctionComponent<Props> = ({
  color = "var(--black)"
}) => {

  return (
    <svg viewBox="0 0 24 24">
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z" />
        <path d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6Z" />
      </g>
    </svg>
  );
};

export default IconEye;