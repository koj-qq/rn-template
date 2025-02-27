/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';
import { getIconColor } from './helper';
import { helpers } from '@td-design/react-native';
const { px } = helpers;

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconWarning: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 7.99992C2 4.68626 4.6865 2 7.99992 2H8.00008C11.3137 2 14 4.68607 14 7.99992C14 11.3137 11.3137 14 7.99992 14C4.6865 14 2 11.3137 2 7.99992ZM2.84375 7.99983C2.84375 10.8399 5.14638 13.1427 7.98661 13.1427L7.98643 13.1429C10.8268 13.1429 13.1295 10.8402 13.1295 8C13.1295 5.15959 10.8268 2.85714 7.98643 2.85714C5.14638 2.85714 2.84375 5.15942 2.84375 7.99983ZM7.99093 4.19643C7.65389 4.19643 7.38065 4.46967 7.38065 4.80671C7.38065 4.8144 7.38078 4.82209 7.38109 4.82978L7.53286 8.84501C7.54216 9.0913 7.74454 9.2862 7.99103 9.2862C8.23752 9.2862 8.4399 9.09132 8.4492 8.84501L8.60082 4.82978C8.61354 4.49295 8.3508 4.20958 8.01397 4.19686C8.00629 4.19657 7.99861 4.19643 7.99093 4.19643ZM7.12946 10.9411C7.12946 10.4679 7.50665 10.0895 7.9811 10.0895H7.98112V10.0893C8.45512 10.0893 8.84375 10.4681 8.84375 10.9411C8.84375 11.425 8.45512 11.8036 7.98112 11.8036C7.48487 11.8036 7.12946 11.4039 7.12946 10.9411Z" fill="${getIconColor(
      color,
      1,
      '#333333',
    )}"/>
  </svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconWarning.defaultProps = {
  size: px(16),
};

IconWarning = React.memo ? React.memo(IconWarning) : IconWarning;

export default IconWarning;
