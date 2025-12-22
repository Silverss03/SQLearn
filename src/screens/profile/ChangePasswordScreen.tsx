import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import TextComponent from '@src/components/TextComponent';
import InputComponent from '@src/components/InputComponent';
import ButtonComponent from '@src/components/ButtonComponent';
import Header from '@src/components/HeaderComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import useCallAPI from '@src/hooks/useCallAPI';
import { changePasswordService } from '@src/network/services/authServices';
import Toast from '@src/components/toast/Toast';

const ChangePasswordScreen = () => {
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();
    const navigation = useNavigation();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { callApi: changePassword, loading } = useCallAPI(
        changePasswordService,
        undefined,
        () => {
            Toast.showToast('Đổi mật khẩu thành công');
            navigation.goBack();
        },
        (status, message) => {
            setErrorMessage(message);
        }
    );

    const isFormValid = useMemo(() => {
        return currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;
    }, [currentPassword, newPassword, confirmPassword]);

    const handleSubmit = useCallback(() => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Mật khẩu mới không khớp');
            return;
        }

        if (newPassword.length < 8) {
             setErrorMessage('Mật khẩu phải có ít nhất 8 ký tự');
             return;
        }

        setErrorMessage('');
        changePassword({
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
        });
    }, [changePassword, currentPassword, newPassword, confirmPassword]);

    return (
        <View style={styles.container}>
            <Header title={t('change_password')} />
            
            <View style={styles.content}>
                <InputComponent
                    placeholder='Mật khẩu hiện tại'
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    containerStyle={styles.input}
                    inputBorderRadius={Dimens.RADIUS_12}
                />

                <InputComponent
                    placeholder='Mật khẩu mới'
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                    containerStyle={styles.input}
                    inputBorderRadius={Dimens.RADIUS_12}
                />

                <InputComponent
                    placeholder='Xác nhận mật khẩu mới'
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    containerStyle={styles.input}
                    inputBorderRadius={Dimens.RADIUS_12}
                    error={errorMessage}
                />

                <ButtonComponent
                    title='Đổi mật khẩu'
                    onPress={handleSubmit}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                />
            </View>
        </View>
    );
};

export default memo(ChangePasswordScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.color_app_background,
    },
    content: {
        padding: Dimens.W_16,
        paddingTop: Dimens.H_24,
    },
    input: {
        marginBottom: Dimens.H_16,
    },
    button: {
        marginTop: Dimens.H_16,
    },
});
