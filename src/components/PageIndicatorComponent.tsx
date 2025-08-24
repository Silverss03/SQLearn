import React, {
    forwardRef,
    memo,
    useCallback,
    useImperativeHandle,
    useState,
} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import {
    ArrowLeftLightIcon,
    ArrowRightLightIcon,
    ThreeDotIcon,
} from '@src/assets/svg';
import TextComponent from '@src/components/TextComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import { Colors } from '@src/configs';
import useDimens, { DimensType } from '@src/hooks/useDimens';

interface IProps {
    totalPage: number,
    onSelectPage: (_page: number) => void,
}

const PageIndicatorComponent = forwardRef<any, IProps>(({ totalPage, onSelectPage }, ref) => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const [currentPage, setCurrentPage] = useState(1);

    const selectPage = useCallback((page: number) => () => {
        setCurrentPage(page);
        onSelectPage(page);
    }, [onSelectPage]);

    const resetPage = useCallback(() => {
        selectPage(1)();
    }, [selectPage]);

    useImperativeHandle(ref, () => ({
        resetPage
    }), [resetPage]);

    const renderView5 = useCallback(() => (
        <>
            {Array(totalPage).fill(1).map((_i, index) => {
                const selected = currentPage === index + 1;
                const page = index + 1;
                return (
                    <TouchableComponent
                        key={index}
                        onPress={selectPage(page)}
                        hitSlop={Dimens.DEFAULT_HIT_SLOP}
                        style={selected ? styles.selectedPageStyle : styles.pageStyle}
                    >
                        <TextComponent style={selected ? styles.selectedText : styles.text}>
                            {page}
                        </TextComponent>
                    </TouchableComponent>
                );
            })}
        </>
    ), [Dimens.DEFAULT_HIT_SLOP, currentPage, selectPage, styles.pageStyle, styles.selectedPageStyle, styles.selectedText, styles.text, totalPage]);

    const renderView = useCallback(() => (
        <>

            <TouchableComponent
                onPress={selectPage((currentPage === 1 || currentPage == 2 || currentPage === totalPage - 1 || currentPage === totalPage) ? 1 : currentPage - 1)}
                hitSlop={Dimens.DEFAULT_HIT_SLOP}
                style={currentPage === 1 ? styles.selectedPageStyle : styles.pageStyle}
            >
                <TextComponent style={currentPage === 1 ? styles.selectedText : styles.text}>
                    {(currentPage === 1 || currentPage == 2 || currentPage === totalPage - 1 || currentPage === totalPage) ? 1 : currentPage - 1}
                </TextComponent>
            </TouchableComponent>

            <TouchableComponent
                onPress={selectPage((currentPage === 1 || currentPage == 2 || currentPage === totalPage - 1 || currentPage === totalPage) ? 2 : currentPage)}
                hitSlop={Dimens.DEFAULT_HIT_SLOP}
                style={currentPage >= 2 && (currentPage !== totalPage - 1 && currentPage !== totalPage) ? styles.selectedPageStyle : styles.pageStyle}
            >
                <TextComponent style={currentPage >= 2 && (currentPage !== totalPage - 1 && currentPage !== totalPage) ? styles.selectedText : styles.text}>
                    {(currentPage === 1 || currentPage == 2 || currentPage === totalPage - 1 || currentPage === totalPage) ? 2 : currentPage}
                </TextComponent>
            </TouchableComponent>

            <ThreeDotIcon fill={'#6F6F6F'} />

            <TouchableComponent
                onPress={selectPage(totalPage - 1)}
                hitSlop={Dimens.DEFAULT_HIT_SLOP}
                style={currentPage === totalPage - 1 ? styles.selectedPageStyle : styles.pageStyle}
            >
                <TextComponent style={currentPage === totalPage - 1 ? styles.selectedText : styles.text}>
                    {totalPage - 1}
                </TextComponent>
            </TouchableComponent>

            <TouchableComponent
                onPress={selectPage(totalPage)}
                hitSlop={Dimens.DEFAULT_HIT_SLOP}
                style={currentPage === totalPage ? styles.selectedPageStyle : styles.pageStyle}
            >
                <TextComponent style={currentPage === totalPage ? styles.selectedText : styles.text}>
                    {totalPage}
                </TextComponent>
            </TouchableComponent>

        </>
    ), [Dimens.DEFAULT_HIT_SLOP, currentPage, selectPage, styles.pageStyle, styles.selectedPageStyle, styles.selectedText, styles.text, totalPage]);

    return totalPage ? (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: Dimens.H_34,
            paddingHorizontal: Dimens.W_60
        }}
        >
            <TouchableComponent
                disabled={currentPage <= 1}
                onPress={selectPage(currentPage > 1 ? currentPage - 1 : 1)}
                hitSlop={Dimens.DEFAULT_HIT_SLOP}
            >
                <ArrowLeftLightIcon
                    width={Dimens.H_16}
                    height={Dimens.H_16}
                />
            </TouchableComponent>

            {totalPage > 5 ? renderView() : renderView5()}

            <TouchableComponent
                disabled={currentPage >= totalPage}
                onPress={selectPage(currentPage < totalPage ? currentPage + 1 : totalPage)}
                hitSlop={Dimens.DEFAULT_HIT_SLOP}
            >
                <ArrowRightLightIcon
                    width={Dimens.H_16}
                    height={Dimens.H_16}
                />
            </TouchableComponent>

        </View>
    ) : null;
});

export default memo(PageIndicatorComponent);

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    selectedText: {
        color: Colors.COLOR_PRIMARY,
        textAlign: 'center',
    },
    text: {
        color: '#6F6F6F',
        textAlign: 'center',
    },
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedPageStyle: {
        backgroundColor: '#F2FDF9',
        borderRadius: Dimens.RADIUS_999,
        width: Dimens.H_30,
        height: Dimens.H_30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageStyle: {
        borderRadius: Dimens.RADIUS_999,
        width: Dimens.H_30,
        height: Dimens.H_30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});