import React, { memo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderComponent from '@src/components/HeaderComponent';
import { useTranslation } from 'react-i18next';
import useThemeColors from '@src/themes/useThemeColors';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import FlatListComponent from '@src/components/FlatListComponent';
import TextComponent from '@src/components/TextComponent';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { getNotificationListThunk, markNotificationsAsReadThunk } from '@src/redux/toolkit/thunks/notificationThunks';
import { NotificationTypes } from '@src/network/dataTypes/notification-types';
import { getTimeAgo } from '@src/utils/dateTimeUtil';

const NotificationScreen = () => {
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const Dimens = useDimens();
    const styles = stylesF(Dimens, themeColors);

    const dispatch = useAppDispatch();
    const notifications = useAppSelector((state) => state.notificationReducer.notifications);

    useEffect(() => {
        dispatch(getNotificationListThunk());
        dispatch(markNotificationsAsReadThunk());
    }, [dispatch]);

    const renderItem = ({ item }: { item: NotificationTypes.Notification }) => (
        <View style={[styles.itemContainer, { backgroundColor: themeColors.color_dialog_background }]}>
            <View style={styles.textContainer}>
                <TextComponent style={[styles.title, { color: themeColors.color_text_2 }]}>
                    {item.title}
                </TextComponent>
                <TextComponent style={[styles.body, { color: themeColors.color_text_2 }]}>
                    {item.body}
                </TextComponent>
                <TextComponent style={[styles.time, { color: themeColors.color_text_2 }]}>
                    {getTimeAgo(item.sent_at, t)}
                </TextComponent>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: themeColors.color_app_background }]}>
            <HeaderComponent title={t('Thông báo')} />
            <FlatListComponent
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    itemContainer: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: Dimens.FONT_16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    body: {
        fontSize: Dimens.FONT_14,
        marginBottom: 4,
    },
    time: {
        fontSize: Dimens.FONT_12,
        opacity: 0.7,
        alignSelf: 'flex-end',
    },
});

export default memo(NotificationScreen);
