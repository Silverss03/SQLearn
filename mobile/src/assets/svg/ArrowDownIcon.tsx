import * as React from 'react';
import Svg, {
    SvgProps, G, Path, Defs, ClipPath
} from 'react-native-svg';
const SVGComponent = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        {...props}
    >
        <G clipPath='url(#a)'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.706 15.707a1 1 0 0 1-1.414 0L5.635 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95 4.95-4.95a1 1 0 0 1 1.414 1.414z'
                fill='#9A9A9A'
            />
        </G>
        <Defs>
            <ClipPath id='a'>
                <Path
                    fill='#fff'
                    d='M0 0h24v24H0z'
                />
            </ClipPath>
        </Defs>
    </Svg>
);
export default SVGComponent;
