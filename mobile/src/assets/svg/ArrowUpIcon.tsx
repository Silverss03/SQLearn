import * as React from 'react';
import Svg, {
    SvgProps, G, Path, Defs, ClipPath
} from 'react-native-svg';

const ArrowUpIcon = (props: SvgProps) => (
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
                d='M11.294 8.293a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414z'
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

export default ArrowUpIcon;
