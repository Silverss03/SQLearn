import React, {
    FC,
    memo,
} from 'react';

import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacityProps,
    View,
} from 'react-native';

import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';

import TextComponent from './TextComponent';
import TouchableComponent from './TouchableComponent';

interface IProps extends TouchableOpacityProps {
    title?: string;
    loading?: boolean;
    loadingColor?: string;
    styleTitle?: StyleProp<TextStyle>;
    disableStyle?: {
        color: any,
        backgroundColor: any,
    };
    leftIcon?: React.ReactElement
    rightIcon?: React.ReactElement
}

const ButtonComponent: FC<IProps> = ({ title, style, disableStyle, loading, loadingColor, disabled, styleTitle, leftIcon, rightIcon, ...rest }) => {
    const themeColors = useThemeColors();
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    return (
        <TouchableComponent
            disabled={disabled || loading}
            style={[styles.viewButton, { backgroundColor: themeColors.color_button_default, }, style, disabled && (disableStyle || { color: themeColors.color_button_text, backgroundColor: themeColors.color_button_disable_default })]}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={loadingColor || themeColors.color_loading_indicator} />
            ) : (
                <>
                    {leftIcon && (
                        <View
                            style={styles.leftIcon}
                        >
                            {leftIcon}
                        </View>
                    )}
                    <TextComponent style={StyleSheet.flatten([styles.textButton, { color: themeColors.color_button_text }, styleTitle, disabled && (disableStyle || { color: themeColors.color_button_text, backgroundColor: themeColors.color_button_disable_default })])}>{title}</TextComponent>
                    {rightIcon && (
                        <View
                            style={styles.rightIcon}
                        >
                            {rightIcon}
                        </View>
                    )}
                </>
            )}
        </TouchableComponent>
    );
};

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    viewButton: {
        height: Dimens.H_40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Dimens.RADIUS_10,
        paddingHorizontal: Dimens.W_16,
        flexDirection: 'row',
    },
    textButton: { fontSize: Dimens.FONT_16, fontWeight: '600', marginHorizontal: Dimens.W_4 },
    rightIcon: {
        paddingLeft: Dimens.W_6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftIcon: {
        paddingRight: Dimens.W_6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default memo(ButtonComponent);
