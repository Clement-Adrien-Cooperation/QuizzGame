import type { FunctionComponent } from 'react';

type Props = {
  color?: string
};

const IconImage: FunctionComponent<Props> = ({
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
        d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Zm1-2h12l-3.75-5l-3 4L9 13Zm-1 2V5v14Z"
      />
    </svg>
  );
};

export default IconImage;