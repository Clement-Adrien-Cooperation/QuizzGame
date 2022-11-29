import type { FunctionComponent } from 'react';

type Props = {
  color?: string
};

const IconArrow: FunctionComponent<Props> = ({
  color = "var(--black)"
}) => {

  return (
    <svg
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
      />
    </svg>
  );
};

export default IconArrow;