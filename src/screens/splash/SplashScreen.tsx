import React, { useMemo } from 'react';

import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

import { ic_launcher } from '@src/assets/images';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';

const SplashScreen = () => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const { themeColors } = useThemeColors();

    const renderLogo = useMemo(() => (
        <Image
            style={{ width: Dimens.H_88, height: Dimens.H_88 }}
            source={ic_launcher}
        />
    ), [Dimens.H_88]);

    return (
        <View style={[styles.splashContainer, { backgroundColor: themeColors.color_app_background }]}>
            {renderLogo}
        </View>
    );
};

export default SplashScreen;

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    splashContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: Dimens.SCREEN_WIDTH / 2.5,
        height: Dimens.SCREEN_WIDTH / 2.5,
        borderRadius: Dimens.SCREEN_WIDTH
    },
});
