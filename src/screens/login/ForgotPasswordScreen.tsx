import React, {
    memo,
    useState,
    useCallback,
} from 'react';

import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import InputComponent from '@src/components/InputComponent';
import ButtonComponent from '@src/components/ButtonComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import { useTranslation } from 'react-i18next';
import { validateEmail } from '@src/utils';
import { LoginImage } from '@src/assets/images';
import NavigationService from '@src/navigation/NavigationService';
import { forgotPasswordService, resetPasswordService } from '@src/network/services/authServices';

const ForgotPasswordScreen = () => {
    const Dimens = useDimens();
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);

    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [forceErrorStyle, setForceErrorStyle] = useState(false);
    
    // Step 2 states
    const [step, setStep] = useState<1 | 2>(1);
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = useCallback((text: string) => {
        setEmail(text);
        if (submitAttempted) {
            setEmailErrorMessage('');
            setForceErrorStyle(false);
        }
    }, [submitAttempted]);

    const handleSendResetLink = useCallback(async () => {
        setSubmitAttempted(true);

        if (!email) {
            setEmailErrorMessage(t('empty_email'));
            setForceErrorStyle(true);
            return;
        }

        const isEmailValid = validateEmail(email);
        if (!isEmailValid) {
            setEmailErrorMessage(t('invalid_email'));
            setForceErrorStyle(true);
            return;
        }

        setEmailErrorMessage('');
        setForceErrorStyle(false);
        setIsLoading(true);

        try {
            const response = await forgotPasswordService({ email });
            if (response?.data?.success) {
                setStep(2);
                setSubmitAttempted(false);
            } else {
                setEmailErrorMessage(response?.data?.message || 'Có lỗi xảy ra');
                setForceErrorStyle(true);
            }
        } catch (error: any) {
            setEmailErrorMessage(error?.response?.data?.message || 'Có lỗi xảy ra');
            setForceErrorStyle(true);
        } finally {
            setIsLoading(false);
        }
    }, [email, t]);

    const handleResetPassword = useCallback(async () => {
        if (!token || !password || !confirmPassword) {
            setPasswordError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError('Mật khẩu không khớp');
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await resetPasswordService({ 
                email,
                token, 
                password,
                password_confirmation: confirmPassword
            });
            
            if (response?.data?.success) {
                setIsSuccess(true);
            } else {
                setPasswordError(response?.data?.message || 'Có lỗi xảy ra');
            }
        } catch (error: any) {
             setPasswordError(error?.response?.data?.message || 'Có lỗi xảy ra');
        } finally {
            setIsLoading(false);
        }

    }, [email, token, password, confirmPassword]);

    const handleBackToLogin = useCallback(() => {
        NavigationService.goBack();
    }, []);

    if (isSuccess) {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={LoginImage}
                />
                
                <View style={styles.successContainer}>
                    <TextComponent style={styles.successTitle}>
                        Thành công!
                    </TextComponent>
                    <TextComponent style={styles.successMessage}>
                        Mật khẩu của bạn đã được đặt lại thành công. Vui lòng đăng nhập lại với mật khẩu mới.
                    </TextComponent>
                </View>

                <ButtonComponent
                    title='Quay lại đăng nhập'
                    onPress={handleBackToLogin}
                    style={styles.button}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={LoginImage}
            />

            <View style={styles.headerContainer}>
                <TextComponent style={styles.title}>
                    Quên mật khẩu?
                </TextComponent>
                <TextComponent style={styles.description}>
                    Nhập email của bạn để nhận liên kết đặt lại mật khẩu
                </TextComponent>
            </View>

            {step === 1 ? (
                <>
                    <InputComponent
                        error={emailErrorMessage}
                        containerStyle={styles.input}
                        value={email}
                        onChangeText={handleEmailChange}
                        inputBorderRadius={Dimens.RADIUS_32}
                        placeholder='Email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        forceErrorStyle={forceErrorStyle}
                    />

                    <ButtonComponent
                        title='Gửi mã'
                        onPress={handleSendResetLink}
                        style={styles.button}
                        loading={isLoading}
                    />
                </>
            ) : (
                <>
                    <InputComponent
                        containerStyle={styles.input}
                        value={token}
                        onChangeText={setToken}
                        inputBorderRadius={Dimens.RADIUS_32}
                        placeholder='Mã xác nhận'
                        autoCapitalize='none'
                    />
                    <InputComponent
                        containerStyle={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        inputBorderRadius={Dimens.RADIUS_32}
                        placeholder='Mật khẩu mới'
                        secureTextEntry
                        autoCapitalize='none'
                    />
                    <InputComponent
                        containerStyle={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        inputBorderRadius={Dimens.RADIUS_32}
                        placeholder='Xác nhận mật khẩu'
                        secureTextEntry
                        autoCapitalize='none'
                        error={passwordError}
                    />
                    
                    <ButtonComponent
                        title='Đặt lại mật khẩu'
                        onPress={handleResetPassword}
                        style={styles.button}
                        loading={isLoading}
                    />
                </>
            )}

            <TouchableComponent
                onPress={handleBackToLogin}
                style={styles.backToLoginContainer}
            >
                <TextComponent style={styles.backToLoginText}>
                    Quay lại đăng nhập
                </TextComponent>
            </TouchableComponent>
        </View>
    );
};

export default memo(ForgotPasswordScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    container: {
        padding: Dimens.W_20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeColors.color_app_background,
    },

    image: {
        width: Dimens.W_297,
        height: Dimens.W_297,
        marginBottom: Dimens.H_24,
    },

    headerContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: Dimens.H_32,
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_8,
    },

    description: {
        fontSize: 14,
        color: themeColors.color_input_place_holder,
        textAlign: 'center',
        paddingHorizontal: Dimens.W_20,
    },

    input: {
        marginTop: Dimens.H_16,
        height: Dimens.H_48,
        width: '100%',
    },

    button: {
        marginTop: Dimens.H_24,
        marginBottom: Dimens.H_16,
        width: '100%',
    },

    backToLoginContainer: {
        alignSelf: 'center',
        marginTop: Dimens.H_8,
        backgroundColor: 'transparent',
        paddingVertical: Dimens.H_8,
    },

    backToLoginText: {
        color: themeColors.color_primary,
        fontSize: 14,
        fontWeight: '600',
    },

    successContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: Dimens.H_32,
        paddingHorizontal: Dimens.W_20,
    },

    successTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: themeColors.color_primary,
        marginBottom: Dimens.H_12,
        textAlign: 'center',
    },

    successMessage: {
        fontSize: 14,
        color: themeColors.color_input_place_holder,
        textAlign: 'center',
        lineHeight: 20,
    },
});
