import React, {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { useTranslation } from 'react-i18next';
import {
    StyleSheet,
    TouchableOpacityProps,
    View,
} from 'react-native';

import { ArrowDownIcon } from '@src/assets/svg';
import DialogComponent from '@src/components/DialogComponent';
import ScrollViewComponent from '@src/components/ScrollViewComponent';
import TextComponent from '@src/components/TextComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import { Colors } from '@src/configs';
import useBoolean from '@src/hooks/useBoolean';
import useDimens, { DimensType } from '@src/hooks/useDimens';

type DataFilterType = {
    id: number | string,
    title: string,
}

interface IProps extends TouchableOpacityProps {
    data?: DataFilterType[]
    placeHolder?: string,
    isMultiSelect?: boolean,
    initIndex?: number,
    initMultiIndex?: number[],
    onSelect?: (_item: DataFilterType, _selectedIndex: number) => void,
    onSelectMulti?: (_item: DataFilterType[], _selectedIndex: number[]) => void,
}

const DropdownComponent: FC<IProps> = ({ placeHolder, initIndex, initMultiIndex, style, data = [], onSelect, isMultiSelect, onSelectMulti, ...rest }) => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);
    const { t } = useTranslation();

    const [selectedIndex, setSelectedIndex] = useState(initIndex === -1 ? undefined : initIndex);
    const [selectedMultiIndex, setSelectedMultiIndex] = useState(initMultiIndex || []);

    const [isShowPopup, showPopup, hidePopup] = useBoolean();

    const handleSelectItem = useCallback((item: DataFilterType, index: number) => () => {
        if (isMultiSelect) {
            setSelectedMultiIndex((state) => {
                let idx = state;
                if (state.includes(index)) {
                    idx = idx.filter((s) => s != index);
                } else {
                    idx = [...idx, index];
                }
                onSelectMulti && onSelectMulti(data.filter((d, index) => idx.includes(index)), idx);
                return idx;
            });
        } else {
            setSelectedIndex(index);
            onSelect && onSelect(item, index);
            hidePopup();
        }

    }, [data, hidePopup, isMultiSelect, onSelect, onSelectMulti]);

    const onDone = useCallback(() => {
        hidePopup();
    }, [hidePopup]);

    useEffect(() => {
        if (isMultiSelect) {
            setSelectedMultiIndex(initMultiIndex || []);
        } else {
            setSelectedIndex(initIndex === -1 ? undefined : initIndex);
        }
    }, [initIndex, initMultiIndex, isMultiSelect]);

    const renderText = useMemo(() => (
        <TextComponent
            numberOfLines={1}
            style={styles.text}
        >
            {
            isMultiSelect
            ?
                selectedMultiIndex?.length ? selectedMultiIndex.map((i) => data[i]?.title).toString() : placeHolder
            :
                selectedIndex !== undefined ? data[selectedIndex]?.title || '' : placeHolder
            }

        </TextComponent>
    ), [data, isMultiSelect, placeHolder, selectedIndex, selectedMultiIndex, styles.text]);

    const renderRightIcon = useMemo(() => (
        <ArrowDownIcon
            width={Dimens.H_24}
            height={Dimens.H_24}
        />
    ), [Dimens.H_24]);

    const renderPopup = useMemo(() => (
        <DialogComponent
            hideModal={hidePopup}
            isVisible={isShowPopup}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            swipeDirection={['down']}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
        >
            <View style={styles.titleContainer}>
                {isMultiSelect && (
                    <View style={{ opacity: 0 }}>
                        <TextComponent style={styles.doneBtnText}>
                            {t('Close')}
                        </TextComponent>
                    </View>
                )}

                <TextComponent style={styles.textTitle}>
                    {placeHolder}
                </TextComponent>

                {isMultiSelect && (
                    <TouchableComponent onPress={onDone}>
                        <TextComponent style={styles.doneBtnText}>
                            {t('Done')}
                        </TextComponent>
                    </TouchableComponent>
                )}
            </View>

            <View style={styles.listWrapper}>
                <ScrollViewComponent>
                    {data.map((d, index) => {
                        const isSelected = isMultiSelect ? selectedMultiIndex.includes(index) : selectedIndex === index;
                        return (
                            <TouchableComponent
                                key={index}
                                onPress={handleSelectItem(d, index)}
                                style={styles.itemContainer}
                            >
                                <TextComponent style={{
                                    color: isSelected ? Colors.COLOR_PRIMARY : undefined,
                                    fontWeight: isSelected ? '600' : '300'
                                }}
                                >
                                    {d.title}
                                </TextComponent>
                            </TouchableComponent>
                        );
                    })}
                </ScrollViewComponent>
            </View>
        </DialogComponent>
    ), [data, handleSelectItem, hidePopup, isMultiSelect, isShowPopup, onDone, placeHolder, selectedIndex, selectedMultiIndex, styles.doneBtnText, styles.itemContainer, styles.listWrapper, styles.textTitle, styles.titleContainer, t]);

    return (
        <TouchableComponent
            onPress={showPopup}
            style={[styles.container, style]}
            {...rest}
        >
            {renderText}
            {renderRightIcon}
            {renderPopup}
        </TouchableComponent>
    );
};

export default memo(DropdownComponent);

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    titleContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: Dimens.H_4,
        paddingBottom: Dimens.H_16, },
    doneBtnText: { fontSize: Dimens.FONT_16, fontWeight: '600', color: Colors.COLOR_PRIMARY },
    itemContainer: {
        paddingVertical: Dimens.H_8
    },
    listWrapper: {
        maxHeight: Dimens.SCREEN_HEIGHT / 2,
        paddingHorizontal: Dimens.W_8
    },
    container: {
        backgroundColor: '#EBEFF7',
        height: Dimens.H_32,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: Dimens.RADIUS_8,
        paddingHorizontal: Dimens.H_10
    },
    text: {
        color: '#706D6D',
        fontSize: Dimens.FONT_12
    },
    textTitle: {
        fontSize: Dimens.FONT_16,
        fontWeight: '600',
        textAlign: 'center',
        marginHorizontal: Dimens.W_24,
        flex: 1
    },
});