import React, {
    memo,
    useMemo,
    useState,
} from 'react';

import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import CardComponent from '@src/components/CardComponent';
import ImageComponent from '@src/components/ImageComponent';
import { AvatarIcon, TabHomeIcon } from '@src/assets/svg';
import { assign, set } from 'lodash';
import InputComponent from '@src/components/InputComponent';
import ButtonComponent from '@src/components/ButtonComponent';
import { useEffectOnce } from 'react-use';
import useCallAPI from '@src/hooks/useCallAPI';
import { loginService } from '@src/network/services/authServices';
import { handleLogin } from '@src/network/util/authUtility';
import DialogComponent from '@src/components/DialogComponent';
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH } from '@src/configs/constants';
import { LoginImage } from '@src/assets/images';
import TouchableComponent from '@src/components/TouchableComponent';

type key = 'email' | 'password'

const LoginScreen = () => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const { themeColors } = useThemeColors();
    const [userInfo, setUserInfo] = useState({ email: '', password: '' })

    const { callApi: loginApi, data, loading } = useCallAPI(
        loginService,
    );

    const [isValid, setIsValid] = useState({ email: false, password: false });
    const [touched, setTouched] = useState({ email: false, password: false });
    const onLogin = async () => {
        if (loading) return;
        await loginApi(userInfo)
        if (data) {
            handleLogin(data)
        }
    }


    const handleChangeText = (key: string, text: string) => {
        setUserInfo(prev => ({ ...prev, [key]: text }))
        if (key === 'email') {
            setIsValid(prev => ({ ...prev, email: EMAIL_REGEX.test(text) }))
            return;
        }
        setIsValid(prev => ({ ...prev, password: text.length >= MIN_PASSWORD_LENGTH }))
    }

    return (
        <View style={styles.loginContainer}>

            <Image
                style={{ width: Dimens.W_297, height: Dimens.W_297 }}
                source={LoginImage}
            />
            <InputComponent
                containerStyle={styles.input}
                placeholder="Email"
                rightIcon
                value={userInfo.email}
                onChangeText={(text) => handleChangeText('email', text)}
                onBlur={() => setTouched({ ...touched, email: true })}
                error={!isValid.email && touched.email ? 'Email không hợp lệ.' : null}
                borderInput={themeColors.color_primary}
            />

            <InputComponent
                containerStyle={styles.input}
                placeholder="Mật khẩu"
                rightIcon
                value={userInfo.password}
                onChangeText={(text) => handleChangeText('password', text)}
                onBlur={() => setTouched({ ...touched, password: true })}
                error={!isValid.password && touched.password ? 'Mật khẩu phải có ít nhất 6 ký tự.' : null}
                borderInput={themeColors.color_primary}

            />

            <TouchableComponent
                onPress={() => { }}
                disabled={loading}
                style={{ alignSelf: 'flex-end', marginTop: Dimens.H_8, marginBottom: Dimens.H_24, backgroundColor: 'transparent' }}
            >
                <TextComponent style={{ color: themeColors.color_primary }} >Quên mật khẩu</TextComponent>
            </TouchableComponent>
            <ButtonComponent
                title='Đăng nhập'
                onPress={onLogin}
                disabled={loading || !isValid.email || !isValid.password}
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