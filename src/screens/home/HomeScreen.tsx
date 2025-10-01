import React, {
    memo,
    useCallback,
    useMemo,
    useRef,
} from 'react';

import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import CardComponent from '@src/components/CardComponent';
import { ArrowRightIcon, ChapterIcon } from '@src/assets/svg';
import DonutChart from '@src/components/DonutChart';
import TouchableComponent from '@src/components/TouchableComponent';
import { SCREENS } from '@src/navigation/config/screenName';
import NavigationService from '@src/navigation/NavigationService';
import FlatListComponent from '@src/components/FlatListComponent';
import useCallPagingAPI from '@src/hooks/useCallPagingAPI';
import { getPokemonDetailService, getPokemonListService } from '@src/network/services/pokemonServices';
import { getChapterListService } from '@src/network/services/chapterService';
import { useEffectOnce } from 'react-use';
import RefreshControlComponent from '@src/components/RefreshControlComponent';
import useCallAPI from '@src/hooks/useCallAPI';
import { getHomeService } from '@src/network/services/homeServices';
import { ChapterType } from '@src/network/dataTypes/chapter-type';
import { AvatarImg } from '@src/assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { useAppSelector } from '@src/hooks';
import { use } from 'i18next';
import HorizontalDivider from '@src/components/HorizontalDivider';
import ProgressBar from '@src/components/ProgressBar';


const HomeScreen = () => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const { themeColors } = useThemeColors();
    const params = useRef({
    });
    const { callApi: getHomeInfo, data: homeInfo } = useCallAPI(
        getHomeService
    );

    const { fetchFirstPage, fetchNextPage, data, refreshing, canLoadMore, refreshData } = useCallPagingAPI(
        getChapterListService,
    );

    const onRefresh = useCallback(() => {
        refreshData(params.current);
    }, [refreshData]);

    const onEndReached = useCallback(() => {
        fetchNextPage(params.current);
    }, [fetchNextPage]);

    const getData = useCallback(() => {
        fetchFirstPage(params.current);
    }, [fetchFirstPage]);

    useEffectOnce(() => {
        getData();
        getHomeInfo();
    });
    const userData = useAppSelector((state) => state.storageReducer.userData);
    const renderText = useMemo(() => (
        <>
            <TextComponent style={styles.userInfo}>
                Hi, {userData?.firstName} {userData?.lastName ?? 'hh'}{"\n"}
                Nhóm lớp
            </TextComponent>
        </>

    ), [styles.text]);

    const renderItem = useCallback(({ item }: { item: ChapterType.ChapterListItemModel }) => (
        <TouchableComponent
            onPress={() => NavigationService.navigate(SCREENS.POKEMON_DETAIL_SCREEN, { pokemonName: item.name })}
            style={styles.itemContainer}
        >
            <ChapterIcon />
            <View style={{ flexDirection: 'column', width: '70%', marginLeft: Dimens.W_10 }}>
                <TextComponent
                    style={{ color: themeColors.color_text_profile_menu }}
                >
                    {item.name}-{item.description}
                </TextComponent>
                <HorizontalDivider color={themeColors.color_button_disable_default} />
                <ProgressBar progress={item.progress} />
            </View>
        </TouchableComponent>
    ), [styles.itemContainer, styles.text]);


    return (
        <View style={styles.homeContainer}>
            <View style={styles.homeInfoContainer}>
                <View style={{ flexDirection: "row", alignItems: 'center', paddingVertical: Dimens.W_20 }}>
                    <Image
                        style={{ width: Dimens.W_110, height: Dimens.W_118, marginRight: Dimens.W_80 }}
                        source={AvatarImg}
                    />
                    {renderText}
                </View>
                <CardComponent style={{ opacity: 0.8 }}>
                    <View style={[styles.cartInfoContainer, { backgroundColor: "#25DBD0" }]}>
                        <DonutChart progress={homeInfo?.progress ?? 0} size={60} />
                        <TextComponent style={styles.cartInfo}>{homeInfo?.progress ?? 0 * 100}</TextComponent>
                        <TextComponent style={styles.text}>%</TextComponent>
                    </View>
                    <View style={[styles.cartInfoContainer, { marginLeft: Dimens.W_10, backgroundColor: "#1A9E8E" }]}>
                        <DonutChart progress={homeInfo?.averageMark ?? 0} size={60} />
                        <TextComponent style={styles.cartInfo}>{homeInfo?.averageMark ?? 0 * 10}</TextComponent>
                        <TextComponent style={styles.cartInfo}>/10</TextComponent>
                    </View>
                </CardComponent>
            </View>
            <View style={{
                padding: Dimens.H_16,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
            }}>

                <View style={[styles.cartInfoContainer, { backgroundColor: "#2F2FAF", flexDirection: "column", padding: Dimens.W_10 }]}>
                    <TextComponent style={styles.text}>Flashcard</TextComponent>
                    <HorizontalDivider />
                    <TextComponent style={styles.text}>{homeInfo?.flashcardsCount ?? 0}</TextComponent>
                    <TouchableComponent
                        onPress={() => { }}
                        style={{ backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center' }}
                    >
                        <TextComponent style={{ color: themeColors.color_button_text }} >Chi tiết</TextComponent>
                        <ArrowRightIcon fill={themeColors.color_button_text} />
                    </TouchableComponent>
                </View>
                <View style={[styles.cartInfoContainer, { backgroundColor: "#ED5B3B", marginLeft: Dimens.W_10, flexDirection: "column", padding: Dimens.W_10 }]}>
                    <TextComponent style={styles.text}>Bảng xếp hạng</TextComponent>
                    <HorizontalDivider />
                    <TextComponent style={styles.text}>{homeInfo?.flashcardsCount ?? 0}</TextComponent>
                    <TouchableComponent
                        onPress={() => { }}
                        style={{ backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center' }}
                    >
                        <TextComponent style={{ color: themeColors.color_button_text }} >Xem</TextComponent>
                        <ArrowRightIcon fill={themeColors.color_button_text} />
                    </TouchableComponent>
                </View>
            </View>
            <View style={{ paddingHorizontal: Dimens.H_16 }}>
                <TextComponent style={{ color: themeColors.color_text_profile_menu }} >Danh sách chương</TextComponent>

                <FlatListComponent
                    data={[{
                        name: 'Chương 1',
                        description: 'start',
                        progress: 45,
                    }, {
                        name: 'Chương 1',
                        description: 'start',
                        progress: 15,
                    }, {
                        name: 'Chương 1',
                        description: 'start',
                        progress: 25,
                    }, {
                        name: 'Chương 1',
                        description: 'start',
                        progress: 25,
                    }]}
                    windowSize={210}
                    removeClippedSubviews
                    onEndReached={onEndReached}
                    renderItem={renderItem}
                    hasNext={canLoadMore}
                    onEndReachedThreshold={0}
                    refreshControl={
                        <RefreshControlComponent
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </View>
    );
};

export default memo(HomeScreen);

const stylesF = (Dimens: DimensType) => StyleSheet.create({

    image: { width: Dimens.H_50, height: Dimens.H_50 },
    homeInfoContainer: { height: Dimens.W_336, backgroundColor: '#2689D1', padding: Dimens.H_16 },
    assignmentCard: { flexDirection: "row", height: 90, marginTop: 16, padding: 16 },
    homeContainer: {
        flex: 1,
        backgroundColor: '#FCE7E7'
    },
    userInfo: {
        color: '#FFFFFF',
        fontSize: Dimens.FONT_20,
    },
    cartInfo: {
        color: '#FFFFFF',
        fontSize: Dimens.FONT_40,
        fontWeight: '900',
        textAlignVertical: 'center',
    },
    cartInfoContainer: {
        flexDirection: "row",
        width: Dimens.W_140,
        height: Dimens.H_100,
        borderRadius: Dimens.RADIUS_12,
    },
    text: {
        textAlignVertical: 'center',
        color: '#FFFFFF',
    },
    itemContainer: {
        marginTop: Dimens.H_8,
        backgroundColor: '#FFFFFF',
        padding: Dimens.H_8,
        borderRadius: Dimens.RADIUS_12,
        flexDirection: 'row',
        alignItems: 'center',
    },
});