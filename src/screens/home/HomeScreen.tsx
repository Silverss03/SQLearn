import React, {
    memo,
    useCallback,
    useMemo,
    useRef,
} from 'react';

import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '@src/hooks';
import HomeAvatarIcon from '@src/assets/svg/HomeAvatarIcon';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const userData = useAppSelector((state) => state.storageReducer.userData);
    console.log('userData', userData);
    const userFullName = userData?.user?.name;
    return (
        <View>
            <LinearGradient
                colors={['#2689D1D3', '#2A9BD8C1']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.homeHeader}
            >
                <HomeAvatarIcon
                    width={130}
                    height={150}
                    style={{ marginLeft: 8 }}
                />

                <View>
                    <TextComponent
                        style = {styles.nameText}
                    >
                        {(t('Xin chào, {{name}}!', { name: userFullName }))}
                    </TextComponent>

                    <TextComponent
                        style = {styles.nameText}
                    >
                        Nhóm lớp 01
                    </TextComponent>
                </View>
            </LinearGradient>
        </View>
    );
};

export default memo(HomeScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        flexDirection: 'row',
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_48,
        justifyContent: 'space-between'
    },
    nameText: {
        fontSize: Dimens.FONT_21,
        color: themeColors.color_text_3,
        marginBottom: Dimens.H_16
    }
});