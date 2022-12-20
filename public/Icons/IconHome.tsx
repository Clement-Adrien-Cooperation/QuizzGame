import type { FunctionComponent } from 'react';

type Props = {
  color?: string
};

const IconHome: FunctionComponent<Props> = ({
  color = "var(--black)"
}) => {

  return (
    <svg
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z"
      />
    </svg>
  );
};

export default IconHome;