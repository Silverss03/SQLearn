import {
    memo, useCallback, useEffect, useState
} from 'react';
import {
    StyleSheet, View,
} from 'react-native';
import { QuestionType } from '@src/network/dataTypes/question-types';
import useCallAPI from '@src/hooks/useCallAPI';
import { getChapterExerciseHistoryService, getExamHistoryService } from '@src/network/services/questionServices';
import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import { useTranslation } from 'react-i18next';
import dayjs from '@src/utils/dayjs';
import FlatListComponent from '@src/components/FlatListComponent';

const HistoryComponent = () => {
    const [historyData, setHistoryData] = useState<(QuestionType.ChapterExerciseRecord | QuestionType.ExamRecord)[]>([]);
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const fetchHistory = useCallback(async () => {
        try {
            const [chapterHistory, examHistory] = await Promise.all([
                getChapterExerciseHistoryService(),
                getExamHistoryService()
            ]);

            const chapterData = chapterHistory.data?.data || [];
            const examData = examHistory.data?.data || [];

            const combinedData = [
                ...chapterData,
                ...examData
            ].sort((a, b) => {
                const dateA = 'completed_at' in a ? a.completed_at : a.submitted_at;
                const dateB = 'completed_at' in b ? b.completed_at : b.submitted_at;
                return dayjs(dateB).diff(dayjs(dateA));
            });

            setHistoryData(combinedData);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }, []);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const renderHistoryItem = ({ item }: { item: QuestionType.ChapterExerciseRecord | QuestionType.ExamRecord }) => {
        const isExam = 'exam_id' in item;
        const title = isExam ? item.title : item.chapter_exercise_title;
        const score = parseFloat(item.score.toString());
        const date = isExam ? item.submitted_at : item.completed_at;

        return (
            <View style={styles.historyItem}>
                <View style={styles.itemHeader}>
                    <TextComponent style={styles.exerciseTitle}>
                        {isExam ? `[${t('Bài kiểm tra')}] ${title}` : title}
                    </TextComponent>
                    <View style={[
                        styles.scoreContainer,
                        { backgroundColor: score >= 80 ? themeColors.color_text_correct : themeColors.color_text_incorrect }
                    ]}
                    >
                        <TextComponent style={styles.scoreText}>
                            {score}
                        </TextComponent>
                    </View>
                </View>
                <View style={styles.itemFooter}>
                    <TextComponent style={styles.dateText}>
                        {dayjs(date).format('DD/MM/YYYY HH:mm')}
                    </TextComponent>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <FlatListComponent
                data={historyData}
                renderItem={renderHistoryItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={<View style={{ height: Dimens.H_24 }}/>}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <TextComponent style={styles.emptyText}>
                            {t('Chưa có lịch sử bài làm')}
                        </TextComponent>
                    </View>
                }
            />
        </View>
    );
};

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    container: {
        borderRadius: Dimens.RADIUS_8,
        padding: Dimens.W_8,
        minHeight: 200
    },
    listContainer: {
        padding: Dimens.W_16,
    },
    historyItem: {
        backgroundColor: themeColors.color_dialog_background,
        borderRadius: Dimens.RADIUS_8,
        padding: Dimens.W_16,
        marginBottom: Dimens.H_12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Dimens.H_8,
    },
    exerciseTitle: {
        fontSize: Dimens.FONT_14,
        fontWeight: '600',
        color: themeColors.color_text,
        flex: 1,
        marginRight: Dimens.W_8,
    },
    scoreContainer: {
        paddingHorizontal: Dimens.W_12,
        paddingVertical: Dimens.H_4,
        borderRadius: Dimens.RADIUS_16,
    },
    scoreText: {
        fontSize: Dimens.FONT_12,
        fontWeight: '600',
        color: themeColors.color_text_3,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: Dimens.FONT_12,
        color: themeColors.color_text_2,
    },
    statusText: {
        fontSize: Dimens.FONT_12,
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
});

export default memo(HistoryComponent);