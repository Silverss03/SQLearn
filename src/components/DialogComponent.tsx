import React, { FC, useCallback } from 'react';

import {
    StatusBar,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';

import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors, { ThemeColorType } from '@src/themes/useThemeColors';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DialogComponentProps extends Partial<ModalProps> {
    hideModal?: () => void,
    containerStyle?: ViewStyle,
    isBottomSheet?: boolean,
    hasDragHandler?: boolean;
    avoidKeyboard?: boolean;
}

const DialogComponent: FC<DialogComponentProps> = ({
    hideModal,
    isBottomSheet = false,
    containerStyle,
    hasDragHandler = true,
    avoidKeyboard = false,
    ...rest
}) => {
    const themeColors = useThemeColors();
    const Dimens = useDimens();
    const inset = useSafeAreaInsets();
    const styles = stylesF(Dimens, themeColors, inset);

    const renderContent = useCallback(() => {
        if (isBottomSheet) {
            return (
                <View style={[
                    styles.contentContainer,
                    styles.bottomSheetContainer,
                    { backgroundColor: themeColors.color_dialog_background, paddingBottom: Dimens.SOFT_MENU_BAR_HEIGHT + Dimens.H_8 },
                    containerStyle,
                ]}
                >
                    <View style={styles.contentInBottomSheetContainer}>
                        {hasDragHandler && <View style={styles.dragHandle} />}
                        {rest.children}
                    </View>
                </View>
            );
        }
        return (
            <View style={[
                styles.contentContainer,
                { backgroundColor: themeColors.color_dialog_background },
                containerStyle,
            ]}
            >
                {rest.children}
            </View>
        );
    }, [isBottomSheet, styles.contentContainer, styles.bottomSheetContainer, styles.contentInBottomSheetContainer, styles.dragHandle, themeColors.color_dialog_background, containerStyle, rest.children, Dimens.SOFT_MENU_BAR_HEIGHT, Dimens.H_8, hasDragHandler]);

    return (
        <Modal
            useNativeDriverForBackdrop
            style={isBottomSheet ? styles.bottomSheetModal : styles.modal}
            deviceHeight={Dimens.SCREEN_HEIGHT + (StatusBar.currentHeight || 0)}
            statusBarTranslucent
            backdropOpacity={0.6}
            propagateSwipe
            animationOutTiming={300}
            animationInTiming={300}
            onBackButtonPress={hideModal}
            onBackdropPress={hideModal}
            onSwipeComplete={hideModal}
            swipeDirection={isBottomSheet ? ['down'] : undefined}
            animationIn={isBottomSheet ? 'slideInUp' : 'fadeIn'}
            animationOut={isBottomSheet ? 'slideOutDown' : 'fadeOut'}
            {...rest}
        >
            {avoidKeyboard ? (
                <KeyboardAvoidingView
                    behavior='padding'
                    keyboardVerticalOffset={-Dimens.COMMON_HEADER_PADDING}
                >
                    {renderContent()}
                </KeyboardAvoidingView>
            ) : (
                renderContent()
            )}
        </Modal>
    );
};

export default DialogComponent;

const stylesF = (Dimens: DimensType, themeColors: ThemeColorType, inset: ReturnType <typeof useSafeAreaInsets>) => StyleSheet.create({
    contentContainer: {
        padding: Dimens.H_16,
        borderRadius: Dimens.RADIUS_12,
    },
    modal: { margin: Dimens.H_24, justifyContent: 'center' },
    bottomSheetModal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    bottomSheetContainer: {
        width: '100%',
        borderTopLeftRadius: Dimens.RADIUS_32,
        borderTopRightRadius: Dimens.RADIUS_32,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingBottom: Dimens.COMMON_BOTTOM_PADDING,
        borderWidth: 1,
        borderColor: '#3A4652',
    },
    contentInBottomSheetContainer: {
        backgroundColor: themeColors.color_dialog_background,
        borderTopLeftRadius: Dimens.RADIUS_32,
        borderTopRightRadius: Dimens.RADIUS_32,
        marginBottom: -inset.bottom,
        paddingBottom: inset.bottom,
        marginHorizontal: -Dimens.W_16,
        paddingHorizontal: Dimens.W_16
    },
    dragHandle: {
        width: Dimens.W_40,
        height: Dimens.H_5,
        backgroundColor: '#DDDDDD',
        borderRadius: Dimens.RADIUS_8,
        alignSelf: 'center',
        marginTop: Dimens.H_8,
        marginBottom: Dimens.H_16,
    },
});
