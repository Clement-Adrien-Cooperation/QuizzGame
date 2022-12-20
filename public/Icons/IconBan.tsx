import type { FunctionComponent } from 'react';

type Props = {
  color?: string
};

const IconBan: FunctionComponent<Props> = ({
  color = "var(--black)"
}) => {

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2c2c2c"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        stroke={color}
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      />

      <polyline
        stroke={color}
        points="16 17 21 12 16 7"
      />

      <line
        stroke={color}
        x1="21"
        y1="12"
        x2="9"
        y2="12"
      />
    </svg>
  );
};

export default IconBan;