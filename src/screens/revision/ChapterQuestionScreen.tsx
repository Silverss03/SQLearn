import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import {
    memo, useCallback, useEffect, useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import { ChapterType } from '@src/network/dataTypes/chapter-type';
import useCallAPI from '@src/hooks/useCallAPI';
import { getChapterListService } from '@src/network/services/chapterService';
import { TabBar } from '@src/components/TabBar';
import ExercisesComponent from './components/ExercisesComponent';
import HistoryComponent from './components/HistoryComponent';

export const TABS = [
    { name: 'Exercises', id: 'exercises' },
    { name: 'History', id: 'history' },
] as const;

const ChapterQuestionScreen = () => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const [value, setValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [chapterList, setChapterList] = useState<ChapterType.Chapter[]>([]);
    const [activeTab, setActiveTab] = useState<string>(TABS[0].id);

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

    useEffect(() => {
        if (chapterList.length > 0) {
            setValue(chapterList[0].id.toString());
        }
    }, [chapterList]);

    const dropdownData = chapterList.map((chapter) => ({
        label: chapter.topic_name,
        value: chapter.id.toString(),
    }));

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={['#0DC2FB', '#1EA69ECF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.homeHeader}
            >
                <TextComponent style={styles.headerText}>
                    {t('Danh sách bài tập')}
                </TextComponent>

                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.placeholderStyle}
                    data={dropdownData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
            </LinearGradient>

            <View style={styles.content}>
                <TabBar
                    isShowFilters={false}
                    tabs={TABS.map((tab) => ({ name: tab.name, id: `${tab.id}` }))}
                    onChangeTab={setActiveTab}
                />

                <View>
                    {activeTab === 'exercises' && (
                        <ExercisesComponent chapterId={Number(value)} />
                    )}
                    {activeTab === 'history' && (
                        <HistoryComponent />
                    )}
                </View>
            </View>
        </View>
    );
};

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    homeHeader: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_48,
        justifyContent: 'space-between',
        borderBottomLeftRadius: Dimens.RADIUS_12,
        borderBottomRightRadius: Dimens.RADIUS_12,
    },
    headerText: {
        color: themeColors.color_app_background,
        fontSize: Dimens.FONT_24,
        fontWeight: '600'
    },
    dropdown: {
        height: Dimens.H_50,
        borderRadius: Dimens.RADIUS_8,
        paddingHorizontal: Dimens.W_8,
        borderWidth: 1,
        borderColor: themeColors.color_common_line,
        backgroundColor: themeColors.color_dialog_background,
        marginTop: Dimens.H_16,
    },
    placeholderStyle: {
        fontSize: Dimens.FONT_14,
        fontWeight: '400',
        color: themeColors.color_text_2,
    },
    content: {
        marginTop: Dimens.H_24,
        paddingHorizontal: Dimens.W_16,
    }
});

export default memo(ChapterQuestionScreen);