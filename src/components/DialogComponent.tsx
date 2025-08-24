import React, { FC } from 'react';

import {
    StatusBar,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';

import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';

interface DialogComponentProps extends Partial<ModalProps> {
    hideModal?: () => void,
    containerStyle?: ViewStyle,
}

const DialogComponent: FC<DialogComponentProps> = ({ hideModal, containerStyle, ...rest }) => {
    const { themeColors } = useThemeColors();
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    return (
        <Modal
            useNativeDriverForBackdrop
            style={styles.modal}
            deviceHeight={Dimens.SCREEN_HEIGHT + (StatusBar.currentHeight || 0)}
            statusBarTranslucent
            backdropOpacity={0.6}
            propagateSwipe
            animationOutTiming={300}
            animationInTiming={300}
            onBackButtonPress={hideModal}
            onBackdropPress={hideModal}
            onSwipeComplete={hideModal}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            {...rest}
        >
            <View style={[styles.contentContainer, containerStyle, { backgroundColor: themeColors.color_dialog_background }]}>
                {rest.children}
            </View>
        </Modal>
    );
};

export default DialogComponent;

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    contentContainer: {
        padding: Dimens.H_16,
        borderRadius: Dimens.RADIUS_8,
    },
    modal: { margin: Dimens.H_24, justifyContent: 'center' },
});