
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
import { getAverageScoreService } from '@src/network/services/homeServices';
import { getOverallProgressService } from '@src/network/services/progresService';
import { OverallProgress } from '@src/network/dataTypes/progress-types';
import { ProgressActions } from '@src/redux/toolkit/actions/progressActions';
import * as Progress from 'react-native-progress';
import { useTranslation } from 'react-i18next';

export interface HomeStatisticsSectionRef {
    refreshData: () => void;
}

const HomeStatisticsSection = forwardRef<HomeStatisticsSectionRef, {}>((props, ref) => {
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.storageReducer.userData);

    const [averageScore, setAverageScore] = useState<number>(0);
    const overallProgress = useAppSelector((state) => state.progressReducer.overallProgress);

    const { refreshData: refreshScore } = useCallAPI(
        getAverageScoreService,
        undefined,
        useCallback((data: { average_score: number }) => {
            setAverageScore(data.average_score);
        }, []),
    );

    const { refreshData: refreshOverall } = useCallAPI(
        getOverallProgressService,
        undefined,
        useCallback((data: OverallProgress) => {
            dispatch(ProgressActions.setOverallProgress(data));
        }, [dispatch]),
    );

    useImperativeHandle(ref, () => ({
        refreshData: () => {
            refreshScore({ user_id: userData?.user?.id || 0 });
            refreshOverall({ user_id: userData?.user?.id });
        },
    }));

    return (
        <View style={styles.homeInfoContainer}>
            <View style={styles.progressContainer}>
                <View style={styles.progressTextContainer}>
                    <TextComponent
                        style={{ fontSize: Dimens.FONT_12, color: '#FFFFFF' }}
                    >
                        {t('Tiến trình')}
                    </TextComponent>
                </View>
                <View style={styles.averageScoreBar}>
                    <Progress.Circle
                        size={Dimens.W_48}
                        progress={((overallProgress?.progress_percentage || 0) / 100)}
                        thickness={10}
                        color="#FF7F00"
                        unfilledColor="#C0F0E8"
                    />
                    <View style={{ marginLeft: Dimens.W_8 }}>
                        <TextComponent style={styles.outOfTenText}>
                            {overallProgress?.completed_lessons}/{overallProgress?.total_lessons}
                        </TextComponent>
                        <TextComponent
                            style={styles.averageScoreText}
                        >
                            {overallProgress?.progress_percentage || 0}%
                        </TextComponent>
                    </View>
                </View>
            </View>

            <View style={styles.averageScoreContainer}>
                <View style={styles.averageScoreTextContainer}>
                    <TextComponent
                        style={{ fontSize: Dimens.FONT_12, color: '#FFFFFF' }}
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
                        style={styles.averageScoreText}
                    >
                        {averageScore.toFixed(2)}
                    </TextComponent>
                </View>
            </View>
        </View>
    );
});

const stylesF = (Dimens: ReturnType<typeof useDimens>, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeInfoContainer: {
        backgroundColor: themeColors.color_home_info_background,
        marginTop: Dimens.W_16,
        padding: Dimens.W_12,
        borderRadius: Dimens.RADIUS_8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Dimens.W_16,
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
});

export default HomeStatisticsSection;
