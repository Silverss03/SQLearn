import React, {
    FC,
    memo,
    ReactElement,
} from 'react';

import {
    StyleSheet,
    View,
    ViewProps,
} from 'react-native';

import { BackArrowIcon } from '@src/assets/svg';
import { Colors } from '@src/configs';
import useDimens, { DimensType } from '@src/hooks/useDimens';

import TextComponent from './TextComponent';
import TouchableComponent from './TouchableComponent';
import NavigationService from '@src/navigation/NavigationService';

export interface HeaderComponentProps extends ViewProps {
    title?: string,
    customContent?: ReactElement,
    rightIcon?: ReactElement,
    hiddenBackIcon?: boolean,
    centerText?: boolean,
}

const HeaderComponent: FC<HeaderComponentProps> = ({ style, title = '', hiddenBackIcon, centerText = true, rightIcon, customContent }) => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    return (
        <View style={[styles.container, style]}>
            {!hiddenBackIcon && (
                <TouchableComponent
                    onPress={() => NavigationService.goBack()}
                    hitSlop={Dimens.DEFAULT_HIT_SLOP}
                >
                    <BackArrowIcon
                        width={Dimens.H_24}
                        height={Dimens.H_24}
                        fill={Colors.COLOR_PRIMARY}
                    />
                </TouchableComponent>
            )}

            {!customContent ? (
                <TextComponent
                    numberOfLines={2}
                    style={[styles.title, { textAlign: centerText ? 'center' : 'left' }]}
                >
                    {title}
                </TextComponent>
            ) : (
                customContent
            )}

            <View style={{
                minWidth: hiddenBackIcon ? 0 : Dimens.H_24
            }}
            >
                {!!rightIcon && rightIcon}
            </View>

        </View>
    );
};

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '500',
        flex: 1,
        textAlign: 'center',
        pointerEvents: 'none',
        paddingHorizontal: Dimens.W_16
    },
    container: {
        paddingTop: Dimens.COMMON_HEADER_PADDING,
        paddingBottom: Dimens.H_8,
        paddingHorizontal: Dimens.W_16,
        backgroundColor: Colors.COLOR_APP_BACKGROUND,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default memo(HeaderComponent);