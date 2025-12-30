import React, {
    FC,
    memo,
    useCallback,
} from 'react';

import {
    StyleSheet,
    View,
    ViewProps,
} from 'react-native';
import Svg, {
    Path,
    SvgProps,
} from 'react-native-svg';

import { Colors } from '@src/configs';
import useDimens, { DimensType } from '@src/hooks/useDimens';

export interface RatingViewComponentProps extends ViewProps {
    starSize?: number,
    rate?: number,
}

const RatingViewComponent: FC<RatingViewComponentProps> = ({ style, starSize, rate = 0 }) => {
    // const themeColors= useThemeColors();
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const renderStar = useCallback((active: boolean) => (
        <StartIcon
            width={starSize || Dimens.H_14}
            height={starSize || Dimens.H_14}
            style={{ marginRight: Dimens.W_4 }}
            fill={active ? Colors.COLOR_PRIMARY : '#B7BCCF'}
        />
    ), [Dimens.H_14, Dimens.W_4, starSize]);

    return (
        <View style={[styles.container, style]}>
            {renderStar(rate >= 1)}
            {renderStar(rate >= 2)}
            {renderStar(rate >= 3)}
            {renderStar(rate >= 4)}
            {renderStar(rate >= 5)}
        </View>
    );
};

const stylesF = (_Dimens: DimensType) => StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
});

export default memo(RatingViewComponent);

const StartIcon = (props: SvgProps) => (
    <Svg
        width={14}
        height={14}
        viewBox='0 0 14 14'
        fill='none'
        {...props}
    >
        <Path
            d='m13.657 6.149-2.82 2.46.845 3.662a1 1 0 0 1-1.49 1.084l-3.194-1.938-3.188 1.938a1 1 0 0 1-1.49-1.084l.843-3.659L.344 6.15a1 1 0 0 1 .57-1.754l3.716-.322L6.08.613a.997.997 0 0 1 1.84 0l1.455 3.46 3.715.322a1 1 0 0 1 .57 1.754z'
            fill={props.fill || '#009B8E'}
        />
    </Svg>
);

