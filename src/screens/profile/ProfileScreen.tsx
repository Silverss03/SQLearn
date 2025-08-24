import React, {
    memo,
    useMemo,
} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';

const ProfileScreen = () => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const { themeColors } = useThemeColors();

    const renderText = useMemo(() => (
        <TextComponent
            style={styles.text}
        >
           ProfileScreen
        </TextComponent>
    ), [styles.text]);

    return (
        <View style={[styles.homeContainer, { backgroundColor: themeColors.color_app_background }]}>
            {renderText}
        </View>
    );
};

export default memo(ProfileScreen);

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        height: Dimens.H_88
    },
});