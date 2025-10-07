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
import { ChapterType } from '@src/network/dataTypes/chapter-type';
import useCallAPI from '@src/hooks/useCallAPI';
import { getChapterListService } from '@src/network/services/chapterService';
import { useTranslation } from 'react-i18next';
import TouchableComponent from '@src/components/TouchableComponent';
import FlatListComponent from '@src/components/FlatListComponent';
import StudyGirlIcon from '@src/assets/svg/StudyGirlIcon';
import { ArrowRightIcon } from '@src/assets/svg';
import NavigationService from '@src/navigation/NavigationService';
import { SCREENS } from '@src/navigation/config/screenName';

const ChapterScreen = () => {
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const [chapterList, setChapterList] = React.useState<ChapterType.Chapter[]>([]);

    const { callApi: fetchChapterList } = useCallAPI(
            getChapterListService,
            undefined,
            useCallback((data: ChapterType.Chapter[]) => {
                setChapterList(data);
            }, []),
    );

    useEffect(() => {
        fetchChapterList();
    }, [fetchChapterList]);

    const onChapterPress = useCallback(({ item } : { item: ChapterType.Chapter }) => {
        console.log('onChapterPress');
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
            <View style={styles.textContainer}>
                <TextComponent style={styles.chapterItemText}>
                    {item.topic_name}
                </TextComponent>
                <View style={styles.line} />
                <TextComponent
                    style={styles.chapterDescription}
                    numberOfLines={2}
                >
                    {item.description}
                </TextComponent>
            </View>

            <View style={styles.iconContainer}>
                <StudyGirlIcon />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Dimens.H_24 }}>
                    <TextComponent style={{ marginRight: Dimens.W_4, fontSize: Dimens.FONT_12, color: themeColors.color_text_2 }}>
                        {t('Chi tiết')}
                    </TextComponent>
                    <ArrowRightIcon
                        width={12}
                        height={12}
                    />
                </View>
            </View>
        </TouchableComponent>
    ), [styles.chapterContainer, styles.textContainer, styles.chapterItemText, styles.line, styles.chapterDescription, styles.iconContainer, onChapterPress, Dimens.H_24, Dimens.W_4, Dimens.FONT_12, themeColors.color_text_2, t]);

    return (
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
    );
};

export default memo(ChapterScreen);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chapterText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
    contentContainer: {
        backgroundColor: themeColors.color_app_background,
        paddingVertical: Dimens.W_32,
        paddingHorizontal: Dimens.W_16,
        flex: 1,
    },
    chapterContainer: {
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_16,
        borderRadius: Dimens.RADIUS_8,
        marginTop: Dimens.H_16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderColor: themeColors.color_primary,
        borderWidth: 1,
    },
    chapterItemText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
    chapterDescription: {
        fontSize: Dimens.FONT_10,
        color: themeColors.color_text_2,
    },
    line: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
    },
    iconContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        marginRight: Dimens.W_12
    },
});