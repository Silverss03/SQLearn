
import React, {
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import TextComponent from '@src/components/TextComponent';
import { SCREENS } from '@src/navigation/config/screenName';
import DialogComponent from '@src/components/DialogComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector, useAppDispatch } from '@src/hooks';
import HomeAvatarIcon from '@src/assets/svg/HomeAvatarIcon';
import { useTranslation } from 'react-i18next';
import { getUnreadNotificationCountThunk } from '@src/redux/toolkit/thunks/notificationThunks';
import BellIcon from '@src/assets/svg/BellIcon';
import NavigationService from '@src/navigation/NavigationService';
import ScrollViewComponent from '@src/components/ScrollViewComponent';
import RefreshControlComponent from '@src/components/RefreshControlComponent';
import HomeStatisticsSection, { HomeStatisticsSectionRef } from './components/HomeStatisticsSection';
import UpcomingExamsSection, { UpcomingExamsSectionRef } from './components/UpcomingExamsSection';
import ChapterListSection, { ChapterListSectionRef } from './components/ChapterListSection';

const HomeScreen = () => {
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const userData = useAppSelector((state) => state.storageReducer.userData);
    const userFullName = userData?.user?.name;
    const dispatch = useAppDispatch();
    
    // Notifications state
    const showGlobalNotification = useAppSelector((state) => state.notificationReducer.showGlobalNotification);
    
    // UI state
    const [isConcurrentLoginDialogVisible, setIsConcurrentLoginDialogVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Refs for sections
    const statisticsRef = useRef<HomeStatisticsSectionRef>(null);
    const upcomingExamsRef = useRef<UpcomingExamsSectionRef>(null);
    const chapterListRef = useRef<ChapterListSectionRef>(null);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        statisticsRef.current?.refreshData();
        upcomingExamsRef.current?.refreshData();
        chapterListRef.current?.refreshData();
        dispatch(getUnreadNotificationCountThunk());
        
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);

    }, [dispatch]);

    useEffect(() => {        
        statisticsRef.current?.refreshData();
        upcomingExamsRef.current?.refreshData();
        chapterListRef.current?.refreshData();
        dispatch(getUnreadNotificationCountThunk());
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ScrollViewComponent
                    refreshControl={
                        <RefreshControlComponent
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    contentContainerStyle={styles.contentContainer}
                >
                    <LinearGradient
                        colors={['#2689D1D3', '#2A9BD8C1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.homeHeader}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <HomeAvatarIcon
                                width={Dimens.W_100}
                                height={Dimens.H_100}
                            />

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <TextComponent
                                    style={styles.nameText}
                                >
                                    {(t('Xin chào, {{name}}', { name: userFullName }))}
                                </TextComponent>

                                <TouchableComponent onPress={() => NavigationService.navigate(SCREENS.NOTIFICATION_SCREEN)}>
                                    <View>
                                        <BellIcon />
                                        {showGlobalNotification && (
                                            <View
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: '#FFFFFF',
                                                }}
                                            />
                                        )}
                                    </View>
                                </TouchableComponent>
                            </View>
                        </View>
                        
                        <HomeStatisticsSection ref={statisticsRef} />
                    </LinearGradient>

                    <View style={styles.bodyContainer}>
                         <UpcomingExamsSection 
                            ref={upcomingExamsRef} 
                            onShow403={() => setIsConcurrentLoginDialogVisible(true)}
                        />

                        <ChapterListSection ref={chapterListRef} />
                    </View>
                    
                </ScrollViewComponent>

                <DialogComponent
                    isVisible={isConcurrentLoginDialogVisible}
                    hideModal={() => setIsConcurrentLoginDialogVisible(false)}
                    containerStyle={{ backgroundColor: themeColors.color_dialog_background }}
                >
                    <View style={{ alignItems: 'center' }}>
                         <TextComponent
                            style={{
                                fontSize: Dimens.FONT_18,
                                fontWeight: 'bold',
                                color: themeColors.color_text_3,
                                marginBottom: Dimens.H_16,
                                textAlign: 'center'
                            }}
                        >
                            {t('Thông báo')}
                        </TextComponent>
                        <TextComponent
                            style={{
                                fontSize: Dimens.FONT_16,
                                color: themeColors.color_text_2,
                                marginBottom: Dimens.H_24,
                                textAlign: 'center'
                            }}
                        >
                            {t('Tài khoản của bạn đang làm bài thi trên thiết bị khác. Vui lòng kiểm tra lại.')}
                        </TextComponent>
                        <TouchableComponent
                            onPress={() => setIsConcurrentLoginDialogVisible(false)}
                            style={{
                                backgroundColor: themeColors.color_primary,
                                paddingVertical: Dimens.H_12,
                                paddingHorizontal: Dimens.W_24,
                                borderRadius: Dimens.RADIUS_8,
                            }}
                        >
                            <TextComponent
                                style={{
                                    fontSize: Dimens.FONT_16,
                                    color: '#FFFFFF',
                                    fontWeight: '600'
                                }}
                            >
                                {t('Đóng')}
                            </TextComponent>
                        </TouchableComponent>
                    </View>
                </DialogComponent>

            </View>
        </View>
    );
};

export default memo(HomeScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_24,
        justifyContent: 'space-between',
        borderBottomLeftRadius: Dimens.RADIUS_12,
        borderBottomRightRadius: Dimens.RADIUS_12,
    },
    nameText: {
        fontSize: Dimens.FONT_21,
        color: themeColors.color_text_3,
        marginBottom: Dimens.H_16,
        marginLeft: Dimens.W_8,
        flexWrap: 'wrap',
        flex: 1,
    },
    contentContainer: {
        backgroundColor: themeColors.color_app_background,
        flexGrow: 1,
    },
    bodyContainer: {
        marginTop: Dimens.H_16,
    }
});