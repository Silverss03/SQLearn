import React, {
    memo,
    useCallback,
    useEffect,
} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '@src/hooks';
import HomeAvatarIcon from '@src/assets/svg/HomeAvatarIcon';
import { useTranslation } from 'react-i18next';
import BellIcon from '@src/assets/svg/BellIcon';
import { getChapterListService } from '@src/network/services/chapterService';
import useCallAPI from '@src/hooks/useCallAPI';
import { ChapterType } from '@src/network/dataTypes/chapter-type';
import FlatListComponent from '@src/components/FlatListComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import { ChapterIcon } from '@src/assets/svg';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationService from '@src/navigation/NavigationService';
import { SCREENS } from '@src/navigation/config/screenName';

const HomeScreen = () => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const userData = useAppSelector((state) => state.storageReducer.userData);
    const userFullName = userData?.user?.name;
    const [chapterList, setChapterList] = React.useState<ChapterType.Chapter[]>([]);

    const { callApi: fetchChapterList } = useCallAPI(
            getChapterListService,
            undefined,
            useCallback((data: ChapterType.Chapter[]) => {
                setChapterList(data);
                console.log('chapterList', data);
            }, []),
    );

    useEffect(() => {
        fetchChapterList();
    }, [fetchChapterList]);

    const onChapterPress = useCallback(({ item } : { item: ChapterType.Chapter }) => {
        NavigationService.navigate(SCREENS.LESSONS_SCREEN, {
            topicId: item.id,
            topicName: item.topic_name,
        });
    }, []);

    const renderChapterItems = useCallback(({ item }: { item: ChapterType.Chapter }) => (
        <TouchableComponent
            style={styles.chapterContainer}
            onPress={() => onChapterPress({ item })}
        >
            <ChapterIcon/>
            <TextComponent style={styles.chapterItemText}>
                {item.topic_name}
            </TextComponent>
        </TouchableComponent>
    ), [onChapterPress, styles.chapterContainer, styles.chapterItemText]);

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#2689D1D3', '#2A9BD8C1']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={styles.homeHeader}
            >
                <HomeAvatarIcon
                    width={130}
                    height={150}
                    style={{ marginLeft: 8 }}
                />

                <View>
                    <View style={styles.bellContainer} >
                        <BellIcon/>
                    </View>
                    <TextComponent
                        style = {styles.nameText}
                    >
                        {(t('Xin chào, {{name}}!', { name: userFullName }))}
                    </TextComponent>

                    <TextComponent
                        style = {styles.nameText}
                    >
                        Nhóm lớp 01
                    </TextComponent>
                </View>
            </LinearGradient>

            <View style={styles.contentContainer}>

                <FlatListComponent
                    data={chapterList}
                    renderItem={renderChapterItems}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={
                        <TextComponent style={styles.chapterText}>
                            {t('Danh sách chương')}
                        </TextComponent>
                    }
                />

            </View>
        </View>
    );
};

export default memo(HomeScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        flexDirection: 'row',
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_48,
        justifyContent: 'space-between'
    },
    nameText: {
        fontSize: Dimens.FONT_21,
        color: themeColors.color_text_3,
        marginBottom: Dimens.H_16
    },
    bellContainer: {
        alignSelf: 'flex-end',
        marginBottom: 16
    },
    contentContainer: {
        backgroundColor: themeColors.color_app_background,
        padding: Dimens.W_16,
        flex: 1,
    },
    chapterText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
    chapterContainer: {
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_16,
        borderRadius: Dimens.RADIUS_8,
        marginTop: Dimens.H_16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chapterItemText: {
        fontSize: Dimens.FONT_14,
        flex: 1,
        marginLeft: Dimens.W_8,
        flexWrap: 'wrap',
        color: themeColors.color_text_2,
    }
});