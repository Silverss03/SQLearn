import { ChapterIcon } from '@src/assets/svg';
import TouchableComponent from '@src/components/TouchableComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import { SCREENS } from '@src/navigation/config/screenName';
import NavigationService from '@src/navigation/NavigationService';
import { ChapterType } from '@src/network/dataTypes/chapter-type';
import useThemeColors from '@src/themes/useThemeColors';
import { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import TextComponent from '@src/components/TextComponent';
import { TopicProgress } from '@src/network/dataTypes/progress-types';
import { Slider } from '@miblanchard/react-native-slider';

interface ChapterComponentProps {
    item: ChapterType.Chapter;
    progress?: TopicProgress;
}
const ChapterComponent = ({ item, progress }: ChapterComponentProps) => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);

    const onChapterPress = useCallback(({ item } : { item: ChapterType.Chapter }) => {
        NavigationService.navigate(SCREENS.MENU_TAB_SCREEN, {
            screen: SCREENS.LESSONS_SCREEN,
            params: {
                topicId: item.id,
                topicName: item.topic_name,
            }
        });
    }, []);

    return (
        <TouchableComponent
            style={styles.chapterContainer}
            onPress={() => onChapterPress({ item })}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ChapterIcon/>
                <TextComponent style={styles.chapterItemText}>
                    {item.topic_name}
                </TextComponent>
            </View>

            <View style={styles.progressWrapper}>
                <TextComponent style={styles.percentageText}>
                    {Math.round(progress?.progress_percentage || 0)}%
                </TextComponent>
                <Slider
                    value={[progress?.progress_percentage || 0]}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    disabled
                    containerStyle={styles.sliderContainer}
                    trackStyle={styles.track}
                    thumbStyle={styles.thumb}
                    minimumTrackTintColor={themeColors.color_primary}
                    maximumTrackTintColor={'#E0E0E0'}
                />
            </View>
        </TouchableComponent>
    );
};

export default memo(ChapterComponent);

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    chapterContainer: {
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_16,
        borderRadius: Dimens.RADIUS_8,
        marginTop: Dimens.H_16,
    },
    chapterItemText: {
        fontSize: Dimens.FONT_14,
        flex: 1,
        marginLeft: Dimens.W_8,
        flexWrap: 'wrap',
        color: themeColors.color_text_2,
    },
    progressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Dimens.H_12,
        gap: Dimens.W_8,
    },
    sliderContainer: {
        flex: 1,
        height: Dimens.H_6,
    },
    track: {
        height: Dimens.H_6,
        borderRadius: Dimens.RADIUS_4,
    },
    thumb: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    percentageText: {
        fontSize: Dimens.FONT_12,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 0.5)',
        minWidth: Dimens.W_40,
        textAlign: 'right',
    },
});