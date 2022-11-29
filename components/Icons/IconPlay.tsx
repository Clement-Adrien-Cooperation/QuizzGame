import type { FunctionComponent } from 'react';

type Props = {
  color?: string,
  height?: string
};

const IconPlay: FunctionComponent<Props> = ({
  color = "var(--black)"
}) => {

  return (
    <svg
      aria-hidden="true"
      role="img"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fill={color}
        d="M8 19V5l11 7Z"
      />
    </svg>
  );
};

export default IconPlay;