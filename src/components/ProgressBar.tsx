import React, { FC } from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

import useDimens, { DimensType } from "@src/hooks/useDimens";
import useThemeColors from "@src/themes/useThemeColors";

interface ProgressBarProps {
    progress: number; // 0 - 100
    width?: number | string;
    height?: number;
    backgroundColor?: string;
    progressColor?: string;
    style?: ViewStyle | ViewStyle[];
}

const ProgressBar: FC<ProgressBarProps> = ({
    progress,
    width,
    height,
    backgroundColor,
    progressColor,
    style,
}) => {
    const { themeColors } = useThemeColors();
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const safeProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <View style={[{ width: width || "100%", flexDirection: 'row', alignItems: 'center' } as ViewStyle, style]}>
            <View style={styles.row}>
                <Text>{safeProgress}%</Text>
            </View>

            <View
                style={[
                    styles.background,
                    {
                        width: width || "100%",
                        height: height || Dimens.H_8,
                        backgroundColor: backgroundColor || themeColors.color_button_disable_default,
                    } as ViewStyle,
                ]}
            >
                <View
                    style={[
                        styles.progress,
                        {
                            width: `${safeProgress}%`,
                            height: height || Dimens.H_8,
                            backgroundColor: progressColor || themeColors.color_primary,
                        },
                    ]}
                />
            </View>
        </View>
    );
};

export default ProgressBar;

const stylesF = (Dimens: DimensType) =>
    StyleSheet.create({
        row: {
            marginRight: Dimens.H_8,
        },
        background: {
            borderRadius: Dimens.RADIUS_8,
            overflow: "hidden",
        },
        progress: {
            borderRadius: Dimens.RADIUS_8,
        },
    });
