import TextComponent from '@src/components/TextComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

const FillblankQuestion = ({ question, questionData, sqlAnswers, setSqlAnswers, isSubmitted } : any) => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const renderQueryTemplate = () => {
        let template = questionData.queryTemplate;

        // Replace each blank with selected answer or placeholder
        questionData.blanks.forEach((blank: any) => {
            const blankPlaceholder = `___${blank.index}___`;
            const selectedOption = blank.options.find((opt: any) => opt.id === sqlAnswers[blank.index.toString()]);
            const replacement = selectedOption
                ? `[${selectedOption.text}]`
                : '___________';

            template = template.replace(blankPlaceholder, replacement);
        });

        return template;
    };
    return (
        <View>
            <View style={styles.questionDescription}>
                <TextComponent style={styles.questionText}>
                    {question.description}
                </TextComponent>
            </View>

            <View style={styles.queryTemplateContainer}>
                <TextComponent style={styles.queryTemplateText}>
                    {renderQueryTemplate()}
                </TextComponent>
            </View>

            <View style={styles.optionsContainer}>
                <TextComponent style={styles.optionsLabel}>
                    {t('Chọn đáp án phù hợp:')}
                </TextComponent>

                {questionData.blanks.map((blank: any) => (
                    <View
                        key={blank.index}
                        style={styles.blankSection}
                    >
                        <View style={styles.optionsRow}>
                            {blank.options.map((option: any) => (
                                <TouchableComponent
                                    key={option.id}
                                    style={[
                                        styles.optionButton,
                                        sqlAnswers[blank.index.toString()] === option.id && styles.selectedOption
                                    ]}
                                    onPress={() => {
                                        if (!isSubmitted) {
                                            setSqlAnswers({
                                                ...sqlAnswers,
                                                [blank.index.toString()]: option.id
                                            });
                                        }
                                    }}
                                    disabled={isSubmitted}
                                >
                                    <TextComponent style={[
                                        styles.optionText,
                                        sqlAnswers[blank.index.toString()] === option.id && styles.selectedOptionText
                                    ]}
                                    >
                                        {option.text}
                                    </TextComponent>
                                </TouchableComponent>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    questionText: {
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_16,
        textAlign: 'center',
    },
    fillBlanksContainer: {
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_16,
        borderRadius: Dimens.RADIUS_8,
        marginTop: Dimens.H_16,
    },
    queryTemplateText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
        fontFamily: 'monospace',
        lineHeight: Dimens.H_24,
    },
    blankContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: Dimens.H_4,
        gap: Dimens.W_8,
    },
    blankOption: {
        backgroundColor: themeColors.color_app_background,
        paddingHorizontal: Dimens.W_8,
        paddingVertical: Dimens.H_4,
        borderRadius: Dimens.RADIUS_4,
        borderWidth: 1,
        borderColor: themeColors.color_text_3,
    },
    selectedBlankOption: {
        backgroundColor: themeColors.color_primary,
        borderColor: themeColors.color_primary,
    },
    blankOptionText: {
        fontSize: Dimens.FONT_12,
        color: themeColors.color_text,
    },
    queryLabel: {
        fontSize: Dimens.FONT_14,
        fontWeight: '600',
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_8,
    },
    queryTemplateContainer: {
        backgroundColor: themeColors.color_dialog_background,
        padding: Dimens.W_8,
        borderRadius: Dimens.RADIUS_8,
        borderWidth: 1,
        borderColor: themeColors.color_text_3,
    },
    optionsContainer: {
        marginTop: Dimens.H_8,
    },
    optionsLabel: {
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
        color: themeColors.color_text_2,
        marginBottom: Dimens.H_8,
    },
    blankSection: {
        marginBottom: Dimens.H_20,
    },
    blankLabel: {
        fontSize: Dimens.FONT_14,
        fontWeight: '500',
        color: themeColors.color_text,
        marginBottom: Dimens.H_8,
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Dimens.W_8,
    },
    optionButton: {
        paddingHorizontal: Dimens.W_16,
        paddingVertical: Dimens.H_12,
        borderRadius: Dimens.RADIUS_6,
        borderWidth: 1,
        borderColor: themeColors.color_question_border,
        minWidth: Dimens.W_80,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: themeColors.color_primary,
        borderColor: themeColors.color_primary,
    },
    optionText: {
        fontSize: Dimens.FONT_14,
        color: themeColors.color_text_2,
        fontFamily: 'monospace',
        fontWeight: '500',
    },
    selectedOptionText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    questionDescription: {
        borderWidth: 1,
        borderColor: themeColors.color_question_border,
        padding: Dimens.W_12,
        borderRadius: Dimens.RADIUS_4,
        backgroundColor: themeColors.color_question_background
    }
});

export default FillblankQuestion;