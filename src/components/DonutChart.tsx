import React, { FC } from 'react';
import {
    View, StyleSheet, ViewStyle
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';

interface DonutChartProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    backgroundColor?: string;
    progressColor?: string;
    containerStyle?: ViewStyle;
}

const DonutChartComponent: FC<DonutChartProps> = ({
    progress,
    size = 100,
    strokeWidth = 13,
    backgroundColor,
    progressColor,
    containerStyle
}) => {
    const themeColors = useThemeColors();
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <View style={[styles.container, containerStyle]}>
            <Svg
                width={size}
                height={size}
            >
                <Circle
                    stroke={backgroundColor || '#61AE9F'}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke={progressColor || '#FF720C'}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={circumference - circumference * progress}
                    rotation="-90"
                    originX={size / 2}
                    originY={size / 2}
                />
            </Svg>
        </View>
    );
};

export default DonutChartComponent;

const stylesF = (Dimens: DimensType) =>
    StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: Dimens.H_8,
        },
    });
