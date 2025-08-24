import React, {
    forwardRef,
    memo,
    MutableRefObject,
    ReactNode,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
} from 'react-native-reanimated';

import {
    EyeIcon,
    EyeSlashIcon,
} from '@src/assets/svg';
import { Colors } from '@src/configs';
import { IS_ANDROID } from '@src/configs/constants';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import { convertFontWeightToFontFamily } from '@src/utils/fontUtil';

import TouchableComponent from './TouchableComponent';

export interface InputComponentProps extends TextInputProps {
    children?: string | ReactNode;
    style?: TextStyle;
    containerStyle?: ViewStyle;
    inputContainerStyle?: ViewStyle;
    leftIconContainerStyle?: ViewStyle;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
    value?: any;
    placeholderTextColor?: any;
    secureTextEntry?: boolean;
    error?: any;
    leftIconPress?: Function;
    rightIconPress?: Function;
    inputPress?: any;
    backgroundInput?: any;
    borderInput?: any;
    textColorInput?: any;
    errorBackgroundInput?: any;
    eyeColor?: any;
    inputBorderRadius?: any;
}

const InputComponent = forwardRef<TextInput, InputComponentProps>(({ containerStyle, style, rightIcon, leftIcon, value, placeholderTextColor, inputPress, leftIconPress, rightIconPress, secureTextEntry, error, backgroundInput, borderInput, textColorInput, errorBackgroundInput, eyeColor, inputBorderRadius, inputContainerStyle, leftIconContainerStyle, ...rest }, ref) => {
    const { themeColors } = useThemeColors();
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const refInput = useRef<TextInput>();

    useImperativeHandle(ref, () => refInput.current as TextInput);

    const [isTextPassWord, setIsTextPassWord] = useState(secureTextEntry);
    const [mIconRight, setIconRight] = useState(rightIcon);

    const onRightIconPress = useCallback(() => {
        rightIconPress &&  rightIconPress();
        if (secureTextEntry) {
            setIsTextPassWord(!isTextPassWord);
        }
    }, [isTextPassWord, rightIconPress, secureTextEntry]);

    const disableInput = useMemo(() => typeof inputPress === 'function', [inputPress]);

    useEffect(() => {
        if (secureTextEntry) {
            setIconRight(isTextPassWord ? (
                <EyeSlashIcon
                    width={Dimens.H_24}
                    height={Dimens.H_24}
                    fill={error ? themeColors.color_error : (eyeColor || themeColors.color_text)}
                />
            ) : (
                <EyeIcon
                    width={Dimens.H_24}
                    height={Dimens.H_24}
                    fill={error ? themeColors.color_error : (eyeColor || themeColors.color_text)}
                />
            ));

        } else {
            setIconRight(rightIcon);
        }
    }, [secureTextEntry, rightIcon, isTextPassWord, value, themeColors.color_text, eyeColor, error, themeColors.color_error, Dimens.H_24]);

    return (
        <View
            style={{
                ...styles.inputWrapper,
                ...containerStyle,
                marginBottom: error ? containerStyle?.marginBottom ? (Number(containerStyle.marginBottom) + Dimens.H_16) : Dimens.H_16 : containerStyle?.marginBottom
            }}
        >
            <TouchableComponent
                activeOpacity={0.9}
                disabled={!disableInput}
                onPress={inputPress}
                style={{
                    ...styles.inputContainer,
                    ...inputContainerStyle,
                    borderRadius: inputBorderRadius || Dimens.RADIUS_10,
                    borderColor: error ? themeColors.color_input_border_error : (borderInput || themeColors.color_input_background),
                    backgroundColor: error ? (errorBackgroundInput || themeColors.color_input_error_background) : (backgroundInput || themeColors.color_input_background)
                }}
            >
                {leftIcon && (
                    <TouchableComponent
                        disabled={disableInput}
                        onPress={leftIconPress}
                        style={[styles.leftIcon, leftIconContainerStyle]}
                        hitSlop={Dimens.DEFAULT_HIT_SLOP}
                    >
                        {leftIcon}
                    </TouchableComponent>
                )}

                <TextInput
                    editable={!disableInput}
                    pointerEvents={disableInput ? 'none' : 'auto'}
                    style={[
                        styles.inputStyle,
                        style,
                        { color: error ? themeColors.color_input_border_error : (textColorInput || themeColors.color_text) },
                        { fontFamily: convertFontWeightToFontFamily(style) },
                        IS_ANDROID && { fontStyle: 'normal', fontWeight: 'normal' }
                    ]}
                    allowFontScaling={false}
                    placeholderTextColor={error ? themeColors.color_input_border_error : (placeholderTextColor || themeColors.color_input_place_holder)}
                    secureTextEntry={isTextPassWord}
                    value={value}
                    {...rest}
                    ref={refInput as MutableRefObject<TextInput>}
                />
                {mIconRight && (
                    <TouchableComponent
                        disabled={disableInput}
                        onPress={onRightIconPress}
                        style={styles.rightIcon}
                        hitSlop={Dimens.DEFAULT_HIT_SLOP}
                    >
                        {mIconRight}
                    </TouchableComponent>
                )}

            </TouchableComponent>

            {error && (
                <Animated.Text
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={[styles.errorText]}
                >
                    {error}
                </Animated.Text>
            )}
        </View>
    );
});

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    rightIcon: {
        paddingRight: Dimens.W_12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftIcon: {
        paddingLeft: Dimens.W_12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        height: Dimens.H_40,
        minHeight: Dimens.W_40
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderRadius: Dimens.RADIUS_10,
        overflow: 'hidden',
    },
    inputStyle: {
        flex: 1,
        includeFontPadding: false,
        fontSize: Dimens.FONT_16,
        paddingHorizontal: Dimens.W_10,
    },
    errorText: {
        fontSize: Dimens.FONT_11,
        color: Colors.COLOR_RED_ERROR,
        marginTop: Dimens.H_4,
        alignSelf: 'flex-start',
        marginLeft: Dimens.W_8
    },
});

export default memo(InputComponent);
