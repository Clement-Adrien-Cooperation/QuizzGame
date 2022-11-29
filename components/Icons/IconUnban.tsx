import type { FunctionComponent } from 'react';

type Props = {
  color?: string
};

const IconUnban: FunctionComponent<Props> = ({
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
        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
      />

      <polyline
        stroke={color}
        points="10 17 15 12 10 7"
      />

      <line
        stroke={color}
        x1="15"
        y1="12"
        x2="3"
        y2="12"
      />
    </svg>
  );
};

export default IconUnban;