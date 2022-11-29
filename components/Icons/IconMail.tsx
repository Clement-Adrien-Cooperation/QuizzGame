import type { FunctionComponent } from 'react';

type Props = {
  color?: string
};

const IconMail: FunctionComponent<Props> = ({
  color = "var(--black)"
}) => {

  return (
    <svg
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M30,8a2,2,0,0,0-.56-1.38l0,0,0,0A2,2,0,0,0,28,6H4a2,2,0,0,0-1.38.56l0,0,0,0A2,2,0,0,0,2,8V24a2,2,0,0,0,.56,1.38l0,0,0,0A2,2,0,0,0,4,26H28a2,2,0,0,0,1.38-.56l0,0,0,0A2,2,0,0,0,30,24ZM4,9.45,10.59,16,4,22.62Zm12,9.17L5.41,8H26.59Zm-4-1.17,3.3,3.3A1,1,0,0,0,16,21a1,1,0,0,0,.71-.3l0,0L20,17.45,26.59,24H5.41ZM21.41,16,28,9.45V22.62Z"
      />
    </svg>
  );
};

export default IconMail;