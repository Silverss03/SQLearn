import React, {
    memo,
    useCallback,
} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { StorageActions } from '@src/redux/toolkit/actions/storageActions';
import NavigationService from '@src/navigation/NavigationService';
import { SCREENS } from '@src/navigation/config/screenName';
import TouchableComponent from '@src/components/TouchableComponent';
import PencilIcon from '@src/assets/svg/PencilIcon';
import DefaultAvatar from './components/DefaultAvatar';
import { AVATAR_UPLOAD_SIZE, IMAGE_SOURCE, openAndCropImage } from '@src/utils/cropImageUtil';
import useCallAPI from '@src/hooks/useCallAPI';
import { updateAvatarService } from '@src/network/services/authServices';
import ImageComponent from '@src/components/ImageComponent';
import { updateUserData } from '@src/network/util/authUtility';
import notifee from '@notifee/react-native';
import FireBaseMessaging from '@react-native-firebase/messaging';

const ProfileScreen = () => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const userProfile = useAppSelector((state) => state.storageReducer.userData);

    const handleLogout = useCallback(() => {
        notifee.cancelAllNotifications();
        FireBaseMessaging().deleteToken(),
        dispatch(StorageActions.removeStorageUserData());
        NavigationService.reset(SCREENS.LOGIN_SCREEN);
    }, [dispatch]);

    const handleChangePassword = useCallback(() => {
        NavigationService.navigate(SCREENS.CHANGE_PASSWORD_SCREEN);
    }, []);

    const { callApi: updateAvatar } = useCallAPI(
            updateAvatarService,
            undefined,
            undefined
    );

    const handleImagePick = useCallback(async () => {
        try {
            const image = await openAndCropImage(
                    IMAGE_SOURCE.GALLERY,
                    AVATAR_UPLOAD_SIZE.WIDTH,
                    AVATAR_UPLOAD_SIZE.HEIGHT,
            );

            // console.log('Picked image:', image);

            if (image) {
                const updatedUserData = {
                    ...userProfile,
                    user: {
                        ...userProfile?.user,
                        image_url: image.uri
                    }
                };
                dispatch(StorageActions.setStorageUserData(updatedUserData));
                updateAvatar({ image: image.uri });
            }

        } catch (error) {
            console.error('Error picking image:', error);
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#2689D1D3', '#2A9BD8C1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.homeHeader}
            >
            </LinearGradient>

            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <TouchableComponent onPress={handleImagePick}>
                        <View style={styles.avatarContainer}>
                            {userProfile?.user.image_url ? (
                                <ImageComponent
                                    source={{ uri: userProfile.user.image_url }}
                                    style={styles.avatar}
                                />
                            ) : (
                                <DefaultAvatar
                                    size={Dimens.W_100}
                                    fullName={userProfile?.user?.fullName}
                                />
                            )}
                            <View style={styles.editIconContainer}>
                                <View style={styles.editIcon}>
                                    <PencilIcon
                                        width={Dimens.W_20}
                                        height={Dimens.H_20}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableComponent>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <TextComponent style={styles.labelText}>
                            {t('Full Name')}
                        </TextComponent>
                        <TextComponent style={styles.valueText}>
                            {userProfile?.user?.name || '-'}
                        </TextComponent>
                    </View>

                    <View style={styles.infoRow}>
                        <TextComponent style={styles.labelText}>
                            {t('Email')}
                        </TextComponent>
                        <TextComponent style={styles.valueText}>
                            {userProfile?.user?.email || '-'}
                        </TextComponent>
                    </View>

                </View>

                <TouchableComponent
                    style={styles.changePasswordButton}
                    onPress={handleChangePassword}
                >
                    <TextComponent style={styles.changePasswordText}>
                        {t('change_password')}
                    </TextComponent>
                </TouchableComponent>

                <TouchableComponent
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <TextComponent style={styles.logoutText}>
                        {t('Logout')}
                    </TextComponent>
                </TouchableComponent>
            </View>
        </View>
    );
};

export default memo(ProfileScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_48,
        justifyContent: 'space-between',
        borderBottomLeftRadius: Dimens.RADIUS_12,
        borderBottomRightRadius: Dimens.RADIUS_12,
    },
    headerText: {
        fontSize: Dimens.FONT_24,
        fontWeight: '600',
        color: themeColors.color_text_3,
    },
    contentContainer: {
        flex: 1,
        padding: Dimens.W_16,
    },
    infoContainer: {
        backgroundColor: themeColors.color_dialog_background,
        borderRadius: Dimens.RADIUS_8,
        padding: Dimens.W_16,
        marginBottom: Dimens.H_24,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Dimens.H_12,
        borderBottomWidth: 1,
        borderBottomColor: themeColors.color_common_line,
    },
    labelText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
    valueText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: themeColors.color_error,
        padding: Dimens.H_16,
        borderRadius: Dimens.RADIUS_8,
        alignItems: 'center',
    },
    logoutText: {
        color: themeColors.color_text_3,
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: Dimens.H_24,
    },
    editIcon: {
        width: Dimens.W_32,
        height: Dimens.H_32,
        resizeMode: 'contain',
        backgroundColor: themeColors.color_button_dark,
        borderRadius: Dimens.W_32 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        width: Dimens.W_90,
        height: Dimens.H_90,

    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: Dimens.W_24,
        height: Dimens.H_24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: Dimens.W_100,
        height: Dimens.W_100,
        borderRadius: Dimens.RADIUS_999,
        resizeMode: 'cover',
    },
    changePasswordButton: {
        backgroundColor: themeColors.color_button_default,
        padding: Dimens.H_16,
        borderRadius: Dimens.RADIUS_8,
        alignItems: 'center',
        marginBottom: Dimens.H_16,
    },
    changePasswordText: {
        color: themeColors.color_button_text,
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
    },
});