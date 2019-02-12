import React from 'react';

interface Props {
  filterId: string;
  height?: string;
  stdDeviation?: number;
}

const SvgDropShadow: React.SFC<Props> = ({
  filterId,
  height = '150%',
  stdDeviation = 10,
}) => (
  <filter id={filterId} xmlns='http://www.w3.org/2000/svg' height={height}>
    <feGaussianBlur in='SourceAlpha' stdDeviation={stdDeviation} />
    <feOffset dx='0' dy='0' result='offsetblur' />
    <feComponentTransfer>
      <feFuncA type='linear' slope='0.5' />
    </feComponentTransfer>
    <feMerge>
      <feMergeNode />
      <feMergeNode in='SourceGraphic' />
    </feMerge>
  </filter>
);

export default SvgDropShadow;
