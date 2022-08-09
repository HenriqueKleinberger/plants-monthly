import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

const DeleteIcon: React.FC<IconProps> = ({ size = 16, color = '#b4a3eb' }) => (
  <Svg viewBox="0 0 512 512" fill={color} height={size} width={size}>
    <Path
      fill={color}
      d="M0 256C0 114.6 114.6 0 256 0s256 114.6 256 256-114.6 256-256 256S0 397.4 0 256zm168-24c-13.3 0-24 10.7-24 24s10.7 24 24 24h176c13.3 0 24-10.7 24-24s-10.7-24-24-24H168z"
    />
  </Svg>
);

export default DeleteIcon;
