import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
    <Svg
        width={16}
        height={16}
        viewBox='0 0 16 16'
        fill='none'
        {...props}
    >
        <Path
            d='M11.073 3.073 10 2 4 8l6 6 1.073-1.073L6.145 8z'
            fill='#6F6F6F'
        />
    </Svg>
);
export default SVGComponent;
