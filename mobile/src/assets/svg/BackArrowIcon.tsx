import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        {...props}
    >
        <Path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.293 12.707a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 1 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414z'
            fill={props.fill || '#383C40'}
        />
    </Svg>
);
export default SVGComponent;
