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
import { getChapterListService } from '@src/network/services/chapterService';
import useCallAPI from '@src/hooks/useCallAPI';
import { ChapterType } from '@src/network/dataTypes/chapter-type';
import FlatListComponent from '@src/components/FlatListComponent';
import { getAverageScoreService } from '@src/network/services/homeServices';
import * as Progress from 'react-native-progress';
import { getAllTopicsProgressService, getOverallProgressService } from '@src/network/services/progresService';
import { OverallProgress, TopicProgress } from '@src/network/dataTypes/progress-types';
import ChapterComponent from './components/ChapterComponent';
import { QuestionType } from '@src/network/dataTypes/question-types';
import { getUpcomingExamsService } from '@src/network/services/questionServices';
import ExamComponent from './components/ExamComponent';

const HomeScreen = () => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const userData = useAppSelector((state) => state.storageReducer.userData);
    const userFullName = userData?.user?.name;
    const [chapterList, setChapterList] = React.useState<ChapterType.Chapter[]>([]);
    const [averageScore, setAverageScore] = React.useState<number>(0);
    const [overallProgress, setOverallProgress] = React.useState<number>(0);
    const [chaptersProgress, setChaptersProgress] = React.useState<TopicProgress[]>([]);
    const [upcomingExams, setUpcomingExams] = React.useState<QuestionType.UpcomingExam[]>([]);

    const { callApi: fetchAllChapterProgress } = useCallAPI(
            getAllTopicsProgressService,
            undefined,
            useCallback((data: TopicProgress[]) => {
                setChaptersProgress(data);
            }, []),
    );

    const { callApi: fetchChapterList } = useCallAPI(
            getChapterListService,
            undefined,
            useCallback((data: ChapterType.Chapter[]) => {
                setChapterList(data);
            }, []),
    );

    const { callApi: fetchAverageScore } = useCallAPI(
            getAverageScoreService,
            undefined,
            useCallback((data: { average_score: number }) => {
                setAverageScore(data.average_score);
            }, []),
    );

    const { callApi: fetchOverallProgress } = useCallAPI(
            getOverallProgressService,
            undefined,
            useCallback((data: OverallProgress) => {
                setOverallProgress(data.progress_percentage);
            }, []),
    );

    const { callApi: fetchUpcomingExams } = useCallAPI(
            getUpcomingExamsService,
            undefined,
            useCallback((data: QuestionType.UpcomingExam[]) => {
                setUpcomingExams(data);
            }, []),
    );

    useEffect(() => {
        fetchChapterList();
        fetchAverageScore({ user_id: userData?.user?.id || 0 });
    }, [fetchAverageScore, fetchChapterList, userData?.user?.id]);

    useEffect(() => {
        fetchOverallProgress({ user_id: userData?.user?.id || 0 });
    }, [fetchOverallProgress, userData?.user?.id]);

    useEffect(() => {
        fetchAllChapterProgress({ user_id: userData?.user?.id });
    }, [fetchAllChapterProgress, userData?.user?.id]);

    useEffect(() => {
        fetchUpcomingExams();
    }, [fetchUpcomingExams, userData?.user?.id]);

    const getChapterProgress = (chapterId: number): TopicProgress | undefined => chaptersProgress.find((p) => p.topic_id === chapterId);

    return (
        <View style={{ flex: 1 }}>
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
                        style={{ marginLeft: 8 }}
                    />

                    <View>
                        <TextComponent
                            style = {styles.nameText}
                        >
                            {(t('Xin chào, {{name}}!', { name: userFullName }))}
                        </TextComponent>
                    </View>
                </View>

                <View style={styles.homeInfoContainer}>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressTextContainer}>
                            <TextComponent
                                style = {{ fontSize: Dimens.FONT_10, color: '#FFFFFF' }}
                            >
                                {t('Tiến trình')}
                            </TextComponent>
                        </View>
                        <View style={styles.averageScoreBar}>
                            <Progress.Circle
                                size={Dimens.W_48}
                                progress={(overallProgress / 100)}
                                thickness={10}
                                color="#FF7F00"
                                unfilledColor="#C0F0E8"
                            />
                            <TextComponent
                                style = {styles.averageScoreText}
                            >
                                {overallProgress}%
                            </TextComponent>
                        </View>
                    </View>

                    <View style={styles.averageScoreContainer}>
                        <View style={styles.averageScoreTextContainer}>
                            <TextComponent
                                style = {{ fontSize: Dimens.FONT_10, color: '#FFFFFF' }}
                            >
                                {t('Điểm trung bình')}
                            </TextComponent>
                        </View>
                        <View style={styles.averageScoreBar}>
                            <Progress.Circle
                                size={Dimens.W_48}
                                progress={(averageScore / 10)}
                                thickness={10}
                                color="#FF7F00"
                                unfilledColor="#C0F0E8"
                            />
                            <TextComponent
                                style = {styles.averageScoreText}
                            >
                                {averageScore.toFixed(2)}
                            </TextComponent>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.contentContainer}>

                {upcomingExams.length > 0 && (
                    <View style={styles.upcomingExamsContainer}>
                        <TextComponent style={styles.chapterText}>
                            {t('Bài kiểm tra sắp tới')}
                        </TextComponent>
                        <FlatListComponent
                            horizontal
                            data={upcomingExams}
                            renderItem={({ item }) => <ExamComponent item={item} />}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.upcomingExamsList}
                        />
                    </View>
                )}

                <FlatListComponent
                    data={chapterList}
                    renderItem={({ item }) => (
                        <ChapterComponent
                            item={item}
                            progress={getChapterProgress(item.id)}
                        />
                    )}
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
        marginLeft: Dimens.W_8
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
    },
    homeInfoContainer: {
        backgroundColor: themeColors.color_home_info_background,
        marginTop: Dimens.W_16,
        padding: Dimens.W_12,
        borderRadius: Dimens.RADIUS_8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    averageScoreContainer: {
        backgroundColor: themeColors.color_home_average_score_background,
        borderRadius: 8,
        width: '45%',
        paddingBottom: Dimens.H_8
    },
    progressContainer: {
        backgroundColor: themeColors.color_home_overall_progress_background,
        borderRadius: 8,
        width: '50%',
        paddingBottom: Dimens.H_8
    },
    averageScoreTextContainer: {
        backgroundColor: '#22AC9C',
        borderBottomRightRadius: Dimens.RADIUS_8,
        borderTopLeftRadius: Dimens.RADIUS_8,
        padding: Dimens.W_8,
        alignSelf: 'flex-start',
        marginBottom: 8
    },
    progressTextContainer: {
        backgroundColor: '#1FBEB599',
        borderBottomRightRadius: Dimens.RADIUS_8,
        borderTopLeftRadius: Dimens.RADIUS_8,
        padding: Dimens.W_8,
        alignSelf: 'flex-start',
        marginBottom: 8
    },
    outOfTenText: {
        fontSize: Dimens.FONT_18,
        color: themeColors.color_text_3,
        marginBottom: 4
    },
    averageScoreText: {
        fontSize: Dimens.FONT_24,
        color: themeColors.color_text_3,
        fontWeight: 'bold',
        marginLeft: Dimens.W_8
    },
    averageScoreBar: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        alignItems: 'center'
    },
    upcomingExamsContainer: {
        marginBottom: Dimens.H_16,
    },
    upcomingExamsList: {
        paddingVertical: Dimens.H_8,
        paddingHorizontal: Dimens.W_4
    },
});