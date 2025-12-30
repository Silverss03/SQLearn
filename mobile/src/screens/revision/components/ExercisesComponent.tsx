import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import {
    memo,
    useCallback,
    useEffect,
    useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import TextComponent from '@src/components/TextComponent';
import useCallAPI from '@src/hooks/useCallAPI';
import { getExerciseByTopicService } from '@src/network/services/questionServices';
import { QuestionType } from '@src/network/dataTypes/question-types';
import FlatListComponent from '@src/components/FlatListComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import { ArrowRightIcon } from '@src/assets/svg';
import NavigationService from '@src/navigation/NavigationService';
import { SCREENS } from '@src/navigation/config/screenName';
import { useAppDispatch } from '@src/hooks';
import { ExerciseActions } from '@src/redux/toolkit/actions/exercisesActions';

interface ExercisesComponentProps {
    chapterId: number;
}

const Exercise = ({ item }: { item: QuestionType.ChapterExercise }) => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const { t } = useTranslation();
    const styles = stylesF(Dimens, themeColors);

    const onExercisePress = useCallback(() => {
        NavigationService.navigate(SCREENS.CHAPTER_EXERCISE_SCREEN, {
            chapterExerciseId: item.id,
            exerciseDescription: item.description
        });
    }, [item.description, item.id]);

    return (
        <View
            style={styles.exerciseContainer}
        >
            <TextComponent style={styles.descriptionText}>{item.description}</TextComponent>

            {item.is_active === 1 && (
                <TouchableComponent
                    style={styles.detailTextContainer}
                    onPress={onExercisePress}
                >
                    <TextComponent style={styles.detailText}>
                        {t('Làm bài')}
                    </TextComponent>
                    <ArrowRightIcon
                        width={12}
                        height={12}
                        fill={themeColors.color_text_3}
                    />
                </TouchableComponent>
            )}
        </View>
    );
};

const ExercisesComponent = ({ chapterId }: ExercisesComponentProps) => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const dispatch = useAppDispatch();

    const [exercises, setExercises] = useState<QuestionType.ChapterExercise[]>([]);

    const { callApi: fetchChapterExercise } = useCallAPI(
            useCallback(() => getExerciseByTopicService(chapterId), [chapterId]),
            undefined,
            useCallback((data: QuestionType.ChapterExercise[]) => {
                setExercises(data);
                data.forEach((exercise) => {
                    if (exercise.is_completed) {
                        dispatch(ExerciseActions.addCompletedExercise(exercise.id));
                    }
                });
            }, [dispatch]),
    );

    useEffect(() => {
        if (chapterId) fetchChapterExercise();
    }, [fetchChapterExercise]);

    return (
        <View style={styles.container}>

            <FlatListComponent
                data={exercises}
                renderItem={({ item }) => <Exercise item={item} />}
                keyExtractor={(item) => item.id.toString()}
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
    detailTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themeColors.color_active_tab_bar,
        padding: Dimens.W_8,
        borderRadius: Dimens.RADIUS_8
    },
    detailText: {
        marginRight: Dimens.W_4,
        fontSize: Dimens.FONT_12,
        color: themeColors.color_text_3
    },
    descriptionText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
    },
    exerciseContainer: {
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Dimens.H_8,
        borderRadius: Dimens.RADIUS_8
    }
});
export default memo(ExercisesComponent);