import TouchableComponent from '@src/components/TouchableComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import { SCREENS } from '@src/navigation/config/screenName';
import NavigationService from '@src/navigation/NavigationService';
import useThemeColors from '@src/themes/useThemeColors';
import { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TextComponent from '@src/components/TextComponent';
import { QuestionType } from '@src/network/dataTypes/question-types';
import { calculateTimeLeft } from '@src/utils/dateTimeUtil';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@src/hooks';

interface ExamComponentProps {
    item: QuestionType.UpcomingExam;
}
const ExamComponent = ({ item }: ExamComponentProps) => {
    const Dimens = useDimens();
    const [timeLeft, setTimeLeft] = useState<string>('');
    const { t } = useTranslation();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);

    const completedExercises = useAppSelector((state) => state.exerciseReducer.completedExercises);
    const isCompleted = completedExercises.includes(item.id);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(item.start_time));
        }, 60000);

        setTimeLeft(calculateTimeLeft(item.start_time));

        return () => clearInterval(timer);
    }, [item.start_time]);

    const handleExamPress = useCallback(() => {
        NavigationService.replace(SCREENS.EXAM_DETAIL_SCREEN, {
            examId: item.id,
            examTitle: item.title,
            examDuration: item.duration_minutes,
        });
    }, [item.duration_minutes, item.id, item.title]);

    return (
        <TouchableComponent
            style={[
                styles.upcomingExamCard,
                !item.is_active && styles.inactiveCard
            ]}
            onPress={handleExamPress}
            disabled={!item.is_active || isCompleted}
        >
            <View>
                <TextComponent style={styles.upcomingExamTitle} numberOfLines={2}>
                    {item.title}
                </TextComponent>
                <TextComponent style={styles.upcomingExamTime}>
                    {`🕒 ${timeLeft}`}
                </TextComponent>
                <TextComponent style={styles.upcomingExamDuration}>
                    {`⏱️ ${item.duration_minutes} phút`}
                </TextComponent>

                {item.is_active && !isCompleted && (
                    <TouchableComponent
                        style={styles.startButton}
                        onPress={handleExamPress}
                    >
                        <TextComponent style={styles.startButtonText}>
                            {t('Bắt đầu làm bài')}
                        </TextComponent>
                    </TouchableComponent>
                )}
            </View>
        </TouchableComponent>
    );
};

export default memo(ExamComponent);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    upcomingExamCard: {
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_16,
        borderRadius: Dimens.RADIUS_12,
        marginRight: Dimens.W_12,
        width: Dimens.W_200,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    upcomingExamTitle: {
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
        color: themeColors.color_text,
        marginBottom: Dimens.H_8,
    },
    upcomingExamTime: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_4,
    },
    upcomingExamDuration: {
        fontSize: Dimens.FONT_12,
        color: '#FF7F00',
    },
    inactiveCard: {
        opacity: 0.7,
    },
    startButton: {
        backgroundColor: themeColors.color_primary,
        borderRadius: Dimens.RADIUS_8,
        padding: Dimens.H_8,
        marginTop: Dimens.H_8,
        alignItems: 'center',
    },
    startButtonText: {
        color: themeColors.color_dialog_background,
        fontSize: Dimens.FONT_14,
        fontWeight: '600',
    },
});