import React, {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';

import {
    Animated,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    useAnimatedValue,
    View,
    ViewStyle,
} from 'react-native';

import { Colors } from '@src/configs';
import useDimens, { DimensType } from '@src/hooks/useDimens';

interface Props {
    switchOn: boolean;
    onPress: () => void;
    containerStyle?: ViewStyle;
    circleStyle?: ViewStyle;
    backgroundColorOn?: string;
    backgroundColorOff?: string;
    backgroundImageOn?: React.ReactElement;
    backgroundImageOff?: React.ReactElement;
    circleColorOff?: string;
    circleColorOn?: string;
    duration?: number;
    type?: number;
    buttonText?: string;
    backTextRight?: string;
    backTextLeft?: string;
    buttonTextStyle?: StyleProp<TextStyle>;
    textRightStyle?: StyleProp<TextStyle>;
    textLeftStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    buttonContainerStyle?: StyleProp<ViewStyle>;
    rightContainerStyle?: StyleProp<ViewStyle>;
    leftContainerStyle?: StyleProp<ViewStyle>;
}

const SwitchComponent: FC<Props> = ({
    backgroundColorOn = Colors.COLOR_PRIMARY,
    backgroundColorOff = '#C4C4C4',
    circleColorOn = 'white',
    circleColorOff = '#6D6D6D',
    duration = 300,
    backgroundImageOn,
    backgroundImageOff,
    switchOn,
    type,
    containerStyle,
    buttonStyle,
    circleStyle,
    rightContainerStyle,
    textRightStyle,
    backTextRight,
    leftContainerStyle,
    textLeftStyle,
    backTextLeft,
    buttonContainerStyle,
    buttonTextStyle,
    buttonText,
    onPress,
}) => {

    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const animXValue = useAnimatedValue(switchOn ? 1 : 0);

    const getStart = useCallback((): number | Record<string, unknown> | undefined => type === undefined
        ? 0
        : type === 0
        ? 0
        : containerStyle?.padding || styles.defaultContainerStyle.padding
        ? (containerStyle?.padding as number || styles.defaultContainerStyle.padding as number) * 2
        : {}, [containerStyle?.padding, styles.defaultContainerStyle.padding, type]);

    const runAnimation = useCallback(() => {
        const animValue = {
            fromValue: switchOn ? 0 : 1,
            toValue: switchOn ? 1 : 0,
            duration,
            useNativeDriver: false,
        };

        Animated.timing(animXValue, animValue).start();
    }, [animXValue, duration, switchOn]);

    const endPos = useMemo(() => (
        containerStyle?.width as number || styles.defaultContainerStyle.width as number) -
        ((circleStyle?.width as number || styles.defaultCircleStyle.width as number) +
          ((containerStyle?.padding as number || styles.defaultContainerStyle.padding as number) || 0) * 2),
    [circleStyle?.width, containerStyle?.padding, containerStyle?.width, styles.defaultCircleStyle.width, styles.defaultContainerStyle.padding, styles.defaultContainerStyle.width]);

    const circlePosXEnd = endPos;
    const circlePosXStart = getStart();

    const prevSwitchOnRef = useRef<boolean>();
    const prevSwitchOn = !!prevSwitchOnRef.current;

    useEffect(() => {
        prevSwitchOnRef.current = switchOn;

        if (prevSwitchOn !== switchOn) runAnimation();
    }, [prevSwitchOn, switchOn, runAnimation]);

    const generateRightText = (): React.ReactElement => (
        <Animated.View style={rightContainerStyle}>
            <Text style={textRightStyle}>{backTextRight}</Text>
        </Animated.View>
    );

    const generateLeftText = (): React.ReactElement => (
        <Animated.View style={leftContainerStyle}>
            <Text style={textLeftStyle}>{backTextLeft}</Text>
        </Animated.View>
    );

    const generateLeftIcon = (): React.ReactElement => (
        <View style={{ position: 'absolute', left: 5 }}>{backgroundImageOn}</View>
    );

    const generateRightIcon = (): React.ReactElement => (
        <View style={{ position: 'absolute', right: 5 }}>{backgroundImageOff}</View>
    );

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Animated.View
                style={[
                    styles.defaultContainerStyle,
                    containerStyle,
                    {
                        backgroundColor: animXValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                                backgroundColorOff as string | number,
                                backgroundColorOn as string | number,
                            ] as string[] | number[],
                        }),
                    },
                ]}
            >
                {generateLeftText()}
                {switchOn && generateLeftIcon()}
                <Animated.View
                    style={[
                        styles.defaultCircleStyle,
                        circleStyle,
                        {
                            backgroundColor: animXValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                    circleColorOff as string | number,
                                    circleColorOn as string | number,
                                ] as string[] | number[],
                            }),
                        },
                        {
                            transform: [
                                {
                                    translateX: animXValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [
                                            circlePosXStart as string | number,
                                            circlePosXEnd as string | number,
                                        ] as string[] | number[],
                                    }),
                                },
                            ],
                        },
                        buttonStyle,
                    ]}
                >
                    <Animated.View style={buttonContainerStyle}>
                        <Text style={buttonTextStyle}>{buttonText}</Text>
                    </Animated.View>
                </Animated.View>
                {generateRightText()}
                {!switchOn && generateRightIcon()}
            </Animated.View>
        </TouchableOpacity>
    );
};

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    defaultCircleStyle: {
        width: Dimens.H_20,
        height: Dimens.H_20,
        borderRadius: Dimens.H_20 / 2,
    },
    defaultContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: Dimens.W_55,
        // height: Dimens.W_40,
        borderRadius: Dimens.RADIUS_999,
        padding: Dimens.H_4,
    },
});

export default SwitchComponent;