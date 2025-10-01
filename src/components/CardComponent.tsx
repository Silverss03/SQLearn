import React, { FC, ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

import useDimens, { DimensType } from "@src/hooks/useDimens";
import useThemeColors from "@src/themes/useThemeColors";

interface CardComponentProps {
    children?: ReactNode;
    backgroundColor?: string;
    style?: ViewStyle | ViewStyle[];
}

const CardComponent: FC<CardComponentProps> = ({
    children,
    backgroundColor = "#fff",
    style,
}) => {
    const { themeColors } = useThemeColors();
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    return (
        <View style={[styles.card, { backgroundColor: backgroundColor || themeColors.color_card_background }, style]}>
            {children}
        </View>
    );
};

export default CardComponent;

const stylesF = (Dimens: DimensType) =>
    StyleSheet.create({
        card: {
            borderRadius: Dimens.RADIUS_12,
            padding: Dimens.H_16,
            marginVertical: Dimens.H_8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
        },
    });
