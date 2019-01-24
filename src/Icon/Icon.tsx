import React from 'react';
import sizes from './sizes';
import paths from './paths';

export type IconName = keyof typeof paths;

interface Props {
  name: IconName;
}

const Icon: React.SFC<Props> = ({ name }) => {
  const [width = 0, height = 0] = sizes[name] || [];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className='svgIcon'
    >
      <path d={paths[name]} />
    </svg>
  );
};

export default Icon;
