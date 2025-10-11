import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import { useTranslation } from 'react-i18next';
import TextComponent from '@src/components/TextComponent';
import { StyleSheet, View } from 'react-native';
import TouchableComponent from '@src/components/TouchableComponent';
import { Colors } from '@src/configs';

const DragDropQuestion = ({ question, dragDropAnswer, setDragDropAnswer, availableComponents, isSubmitted } : any) => {
    const Dimens = useDimens();

    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();
    return (
        <View>
            <TextComponent style={styles.questionText}>
                {question.description}
            </TextComponent>

            {/* Answer Zone */}
            <View style={styles.answerZone}>
                <TextComponent style={styles.answerZoneLabel}>
                    {t('Kéo thả các thành phần để tạo câu truy vấn:')}
                </TextComponent>
                <View style={styles.answerContainer}>
                    {dragDropAnswer.map((component, index) => (
                        <TouchableComponent
                            key={`answer-${component.id}-${index}`}
                            style={styles.sqlComponent}
                            onPress={() => {
                                if (!isSubmitted) {
                                    const newAnswer = [...dragDropAnswer];
                                    newAnswer.splice(index, 1);
                                    setDragDropAnswer(newAnswer);
                                }
                            }}
                            disabled={isSubmitted}
                        >
                            <TextComponent style={styles.sqlComponentText}>
                                {component.text}
                            </TextComponent>
                        </TouchableComponent>
                    ))}
                </View>
            </View>

            {/* Available Components */}
            <View style={styles.componentsContainer}>
                <TextComponent style={styles.componentsLabel}>
                    {t('Thành phần có sẵn:')}
                </TextComponent>
                <View style={styles.componentsGrid}>
                    {availableComponents.map((component: any) => (
                        <TouchableComponent
                            key={component.id}
                            style={styles.sqlComponent}
                            onPress={() => {
                                if (!isSubmitted) {
                                    setDragDropAnswer([...dragDropAnswer, component]);
                                }
                            }}
                            disabled={isSubmitted}
                        >
                            <TextComponent style={styles.sqlComponentText}>
                                {component.text}
                            </TextComponent>
                        </TouchableComponent>
                    ))}
                </View>
            </View>
        </View>
    );
};

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    questionText: {
        fontSize: Dimens.FONT_18,
        fontWeight: '600',
        color: themeColors.color_text,
        marginBottom: Dimens.H_32,
        textAlign: 'center',
    },
    answerZone: {
        backgroundColor: themeColors.color_dialog_background,
        borderRadius: Dimens.RADIUS_8,
        padding: Dimens.W_16,
        marginBottom: Dimens.H_20,
        minHeight: Dimens.H_80,
    },
    answerZoneLabel: {
        fontSize: Dimens.FONT_14,
        fontWeight: '600',
        color: themeColors.color_text,
        marginBottom: Dimens.H_8,
    },
    answerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Dimens.W_8,
    },
    sqlComponent: {
        backgroundColor: themeColors.color_primary,
        paddingHorizontal: Dimens.W_12,
        paddingVertical: Dimens.H_8,
        borderRadius: Dimens.RADIUS_6,
        marginBottom: Dimens.H_4,
    },
    sqlComponentText: {
        color: Colors.COLOR_WHITE,
        fontSize: Dimens.FONT_14,
        fontWeight: '500',
    },
    componentsContainer: {
        marginTop: Dimens.H_16,
    },
    componentsLabel: {
        fontSize: Dimens.FONT_14,
        fontWeight: '600',
        color: themeColors.color_text,
        marginBottom: Dimens.H_8,
    },
    componentsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Dimens.W_8,
    },
});

export default DragDropQuestion;