import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';

interface DividerProps {
    width?: string | number;
    color?: string;
    thickness?: number;
    marginVertical?: number;
    style?: object;
}

const HorizontalDivider: FC<DividerProps> = ({
    width = '100%',
    color,
    thickness = 1,
    marginVertical,
    style,
}) => {
    const themeColors = useThemeColors();
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    return (
        <View
            style={[
                styles.divider,
                {
                    width,
                    height: thickness,
                    backgroundColor: color || themeColors.color_card_background,
                    marginVertical: marginVertical ?? Dimens.H_8,
                },
                style,
            ]}
        />
    );
};

export default HorizontalDivider;

const stylesF = (Dimens: DimensType) =>
    StyleSheet.create({
        divider: {
            borderRadius: Dimens.RADIUS_12 / 2,
        },
    });
