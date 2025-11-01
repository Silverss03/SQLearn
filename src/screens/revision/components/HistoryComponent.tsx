import {
    memo, useCallback, useEffect, useState
} from 'react';
import {
    StyleSheet, View,
} from 'react-native';
import { QuestionType } from '@src/network/dataTypes/question-types';
import useCallAPI from '@src/hooks/useCallAPI';
import { getChapterExerciseHistoryService } from '@src/network/services/questionServices';
import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import { useTranslation } from 'react-i18next';
import dayjs from '@src/utils/dayjs';
import FlatListComponent from '@src/components/FlatListComponent';

const HistoryComponent = () => {
    const [historyData, setHistoryData] = useState<QuestionType.ChapterExerciseRecord[]>([]);
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const { callApi: fetchHistory } = useCallAPI(
            getChapterExerciseHistoryService,
            undefined,
            useCallback((data: QuestionType.ChapterExerciseRecord[]) => {
                setHistoryData(data);
            }, [])
    );

    useEffect(() => {
        fetchHistory();
        console.log('fetchHistory called');
        console.log(historyData);
    }, [fetchHistory]);

    const renderHistoryItem = ({ item }: { item: QuestionType.ChapterExerciseRecord }) => (
        <View style={styles.historyItem}>
            <View style={styles.itemHeader}>
                <TextComponent style={styles.exerciseTitle}>
                    {item.chapter_exercise_title}
                </TextComponent>
                <View style={[
                    styles.scoreContainer,
                    { backgroundColor: item.score >= 80 ? themeColors.color_text_correct : themeColors.color_text_incorrect }
                ]}
                >
                    <TextComponent style={styles.scoreText}>
                        {item.score}
                    </TextComponent>
                </View>
            </View>
            <View style={styles.itemFooter}>
                <TextComponent style={styles.dateText}>
                    {dayjs(item.completed_at).format('DD/MM/YYYY HH:mm')}
                </TextComponent>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            <FlatListComponent
                data={historyData}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.chapter_exercise_id.toString()}
                ListHeaderComponent={<View style={{ height: Dimens.H_24 }}/>}
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