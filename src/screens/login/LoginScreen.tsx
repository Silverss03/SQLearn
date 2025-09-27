import React, {
    memo,
    useState,
    useMemo,
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
import useCallAPI from '@src/hooks/useCallAPI';
import { loginService } from '@src/network/services/authServices';
import { LoginImage } from '@src/assets/images';
import TouchableComponent from '@src/components/TouchableComponent';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@src/hooks';
import { validateEmail } from '@src/utils';

const LoginScreen = () => {
    const Dimens = useDimens();
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState(__DEV__ ? 'john2@example.com' : '');
    const [password, setPassword] = useState(__DEV__ ? '123@12345' : '');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [forceErrorStyle, setForceErrorStyle] = useState(false);

    const isFormComplete = useMemo(() =>
        email.trim() !== '' && password.trim() !== '', [email, password]);

    const validatePassword = useCallback((password: string) => {
        if (!password) return t('empty_password');
        if (password.length < 8) return t('wrong_password');
        return '';
    }, [t]);

    const handleEmailChange = useCallback((text: string) => {
        setEmail(text);
        if (submitAttempted) {
            setEmailErrorMessage('');
            setForceErrorStyle(false);
        }
    }, [submitAttempted]);

    const handlePasswordChange = useCallback((text: string) => {
        setPassword(text.replace(/\s/g, ''));
        if (submitAttempted) {
            setPasswordErrorMessage('');
            setForceErrorStyle(false);
        }
    }, [submitAttempted]);

    const { callApi: login } = useCallAPI(
            loginService,
            undefined,
            useCallback(( data : AuthType.User) => {
                dispatch(StorageActions.completeFirstLaunch());
                setHeaderToken(data.access_token);
                dispatch(StorageActions.setStorageUserData(data));
            }, [dispatch]),
            undefined,
            false
    );

    const handleLogin = useCallback(async () => {
        if (isFormComplete) {
            try {
                const response = await login({ email, password });
                if (!response.success) {
                    setPasswordErrorMessage(response.message);
                    setForceErrorStyle(true);
                }
            } catch (error) {
                console.error('Login error:', error);
            }
        }
    }, [isFormComplete, login, email, password]);

    const onLogin = useCallback(async () => {
        console.log('onLogin');
        setSubmitAttempted(true);

        const isEmailValid = validateEmail(email);
        const passwordError = validatePassword(password);
        console.log('isEmailValid', isEmailValid);

        if (!email) {
            setEmailErrorMessage(t('empty_email'));
            setForceErrorStyle(true);
            return;
        }
        if (!isEmailValid) {
            setEmailErrorMessage(t('invalid_email'));
            setForceErrorStyle(true);
            return;
        }
        if (passwordError) {
            setPasswordErrorMessage(passwordError);
            setForceErrorStyle(true);
            return;
        }

        setPasswordErrorMessage('');
        setEmailErrorMessage('');
        setForceErrorStyle(false);

        handleLogin();
    }, [email, handleLogin, password, t, validatePassword]);

    // const handleForgetPasswordPress = () => {
    //     NavigationService.navigate(SCREENS.FILL_EMAIL_SCREEN);
    // };

    return (
        <View style={styles.loginContainer}>

            <Image
                style={{ width: Dimens.W_297, height: Dimens.W_297 }}
                source={LoginImage}
            />

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

            <InputComponent
                error={passwordErrorMessage}
                containerStyle={styles.input}
                //style={styles.inputStyle}
                value={password}
                onChangeText={handlePasswordChange}
                inputBorderRadius={Dimens.RADIUS_32}
                placeholder={t('password_holder')}
                secureTextEntry
                forceErrorStyle={forceErrorStyle}
            />

            <TouchableComponent
                onPress={() => { }}
                // disabled={loading}
                style={{ alignSelf: 'flex-end', marginTop: Dimens.H_8, marginBottom: Dimens.H_24, backgroundColor: 'transparent' }}
            >
                <TextComponent style={{ color: themeColors.color_primary }} >Quên mật khẩu</TextComponent>
            </TouchableComponent>
            <ButtonComponent
                title='Đăng nhập'
                onPress={onLogin}
                // disabled={loading || !isValid.email || !isValid.password}
                style={{ marginTop: Dimens.H_8, marginBottom: Dimens.H_24, width: '100%' }}
            />

        </View>
    );
};

export default memo(LoginScreen);

const stylesF = (Dimens: DimensType) => StyleSheet.create({

    image: { width: Dimens.W_336, height: Dimens.W_336 },
    input: {
        marginTop: Dimens.H_16,
        height: Dimens.H_48,

    },

    loginContainer: {
        padding: Dimens.W_20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});