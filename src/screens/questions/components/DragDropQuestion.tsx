import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DuoDragDrop from '@jamsch/react-native-duo-drag-drop';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import { useTranslation } from 'react-i18next';
import TextComponent from '@src/components/TextComponent';
import { StyleSheet, View } from 'react-native';
import { forwardRef } from 'react';

const DragDropQuestion = forwardRef<any, any>(({ question, dragDropAnswer, availableComponents, isSubmitted }, ref) => {
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    // Combine answered and bank components into single words array (texts only)
    // Maintain order: answered first, then bank components
    const answeredTexts = dragDropAnswer.map((c: any) => c.text);
    const availableTexts = availableComponents
            .filter((c: any) => !answeredTexts.includes(c.text))
            .map((c: any) => c.text);
    const allWords = [...answeredTexts, ...availableTexts];

    const gesturesDisabled = isSubmitted;
    // const ref = useRef<DuoDragDropRef>(null);

    return (
        <View>
            <View style={styles.questionDescription}>
                <TextComponent style={styles.questionText}>
                    {question.description}
                </TextComponent>
            </View>
            <View style={styles.answerZone}>
                <TextComponent style={styles.answerZoneLabel}>
                    {t('Kéo thả các thành phần để tạo câu truy vấn:')}
                </TextComponent>
                <GestureHandlerRootView style={{ minHeight: 150 }}>
                    <DuoDragDrop
                        ref={ref}
                        words={allWords}
                        gesturesDisabled={gesturesDisabled}
                    />
                </GestureHandlerRootView>
            </View>
        </View>
    );
});

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    questionText: {
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_32,
        textAlign: 'center',
    },
    answerZone: {
        backgroundColor: themeColors.color_dialog_background,
        borderRadius: Dimens.RADIUS_8,
        padding: Dimens.W_16,
        marginBottom: Dimens.H_12,
        minHeight: Dimens.H_80,
    },
    answerZoneLabel: {
        fontSize: Dimens.FONT_14,
        fontWeight: '600',
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_8,
    },
    answerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Dimens.W_8,
    },
    sqlComponent: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_12,
        borderRadius: Dimens.RADIUS_6,
        borderWidth: 1,
        borderColor: themeColors.color_question_border,
        minWidth: Dimens.W_80,
        alignItems: 'center',
    },
    sqlComponentText: {
        color: themeColors.color_text_2,
        fontSize: Dimens.FONT_14,
        fontWeight: '500',
    },
    componentsContainer: {
        marginTop: Dimens.H_8,
    },
    componentsLabel: {
        fontSize: Dimens.FONT_14,
        fontWeight: '600',
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_8,
    },
    componentsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Dimens.W_8,
    },
    questionDescription: {
        borderWidth: 1,
        borderColor: themeColors.color_question_border,
        padding: Dimens.W_8,
        borderRadius: Dimens.RADIUS_4,
        backgroundColor: themeColors.color_question_background
    }
});

export default DragDropQuestion;