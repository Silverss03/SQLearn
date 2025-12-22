
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
import useCallAPI from '@src/hooks/useCallAPI';
import { getUpcomingExamsService } from '@src/network/services/questionServices';
import { QuestionType } from '@src/network/dataTypes/question-types';
import FlatListComponent from '@src/components/FlatListComponent';
import ExamComponent from './ExamComponent';
import { useTranslation } from 'react-i18next';

export interface UpcomingExamsSectionRef {
    refreshData: () => void;
}

interface UpcomingExamsSectionProps {
    onShow403: () => void;
}

const UpcomingExamsSection = forwardRef<UpcomingExamsSectionRef, UpcomingExamsSectionProps>((props, ref) => {
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const [upcomingExams, setUpcomingExams] = useState<QuestionType.UpcomingExam[]>([]);

    const { refreshData: refreshExams } = useCallAPI(
        getUpcomingExamsService,
        undefined,
        useCallback((data: QuestionType.UpcomingExam[]) => {
            setUpcomingExams(data);
        }, []),
    );

    useImperativeHandle(ref, () => ({
        refreshData: () => {
            refreshExams();
        },
    }));

    if (upcomingExams.length === 0) {
        return null;
    }

    return (
        <View style={styles.upcomingExamsContainer}>
            <TextComponent style={styles.chapterText}>
                {t('Bài kiểm tra sắp tới')}
            </TextComponent>
            <FlatListComponent
                horizontal
                data={upcomingExams}
                renderItem={({ item }) => (
                    <ExamComponent 
                        item={item} 
                        onShow403={props.onShow403}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.upcomingExamsList}
            />
        </View>
    );
});

const stylesF = (Dimens: ReturnType<typeof useDimens>, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    upcomingExamsContainer: {
        marginBottom: Dimens.H_16,
        paddingHorizontal: Dimens.W_16,
    },
    upcomingExamsList: {
        paddingVertical: Dimens.H_8,
        paddingHorizontal: Dimens.W_4
    },
    chapterText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
});

export default UpcomingExamsSection;
