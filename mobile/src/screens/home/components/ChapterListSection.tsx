import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import TextComponent from '@src/components/TextComponent';
import useDimens from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import useCallAPI from '@src/hooks/useCallAPI';
import { getChapterListService } from '@src/network/services/chapterService';
import { getAllTopicsProgressService } from '@src/network/services/progresService';
import { ChapterType } from '@src/network/dataTypes/chapter-type';
import { TopicProgress } from '@src/network/dataTypes/progress-types';
import { ProgressActions } from '@src/redux/toolkit/actions/progressActions';
import ChapterComponent from './ChapterComponent';
import { useTranslation } from 'react-i18next';

export interface ChapterListSectionRef {
    refreshData: () => void;
}

const ChapterListSection = forwardRef<ChapterListSectionRef, {}>((props, ref) => {
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.storageReducer.userData);

    const [chapterList, setChapterList] = useState<ChapterType.Chapter[]>([]);
    const chaptersProgress = useAppSelector((state) => state.progressReducer.topicsProgress);

    const { refreshData: refreshChapters } = useCallAPI(
        getChapterListService,
        undefined,
        useCallback((data: ChapterType.Chapter[]) => {
            setChapterList(data);
        }, []),
    );

    const { refreshData: refreshProgress } = useCallAPI(
        getAllTopicsProgressService,
        undefined,
        useCallback((data: TopicProgress[]) => {
            dispatch(ProgressActions.setTopicsProgress(data));
        }, [dispatch]),
    );

    useImperativeHandle(ref, () => ({
        refreshData: () => {
            refreshChapters();
            refreshProgress({ user_id: userData?.user?.id });
        },
    }));

    const getChapterProgress = (chapterId: number): TopicProgress | undefined => chaptersProgress.find((p: TopicProgress) => p.topic_id === chapterId);

    return (
        <View style={styles.container}>
            <TextComponent style={styles.chapterText}>
                {t('Danh sách chương')}
            </TextComponent>
            
            {chapterList.map((item) => (
                <ChapterComponent
                    key={item.id.toString()}
                    item={item}
                    progress={getChapterProgress(item.id)}
                />
            ))}
        </View>
    );
});

const stylesF = (Dimens: ReturnType<typeof useDimens>, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    container: {
        marginBottom: Dimens.H_16,
        paddingHorizontal: Dimens.W_16,
    },
    chapterText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_8,
    },
});

export default ChapterListSection;
