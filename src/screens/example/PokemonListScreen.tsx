import React, {
    memo,
    useCallback,
    useRef,
} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';
import { useEffectOnce } from 'react-use';

import ButtonComponent from '@src/components/ButtonComponent';
import FlatListComponent from '@src/components/FlatListComponent';
import ImageComponent from '@src/components/ImageComponent';
import RefreshControlComponent from '@src/components/RefreshControlComponent';
import TextComponent from '@src/components/TextComponent';
import TouchableComponent from '@src/components/TouchableComponent';
import useCallPagingAPI from '@src/hooks/useCallPagingAPI';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import { SCREENS } from '@src/navigation/config/screenName';
import NavigationService from '@src/navigation/NavigationService';
import { PokemonType } from '@src/network/dataTypes/pokemon-type';
import { getPokemonListService } from '@src/network/services/pokemonServices';
import useThemeColors from '@src/themes/useThemeColors';

const PokemonListScreen = () => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);
    const { themeColors } = useThemeColors();

    const params = useRef({
    });

    const { fetchFirstPage, fetchNextPage, data, refreshing, canLoadMore, refreshData } = useCallPagingAPI(
            getPokemonListService,
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
    });

    const renderItem = useCallback(({ item } : {item: PokemonType.PokemonListItemModel}) => (
        <TouchableComponent
            onPress={() => NavigationService.navigate(SCREENS.POKEMON_DETAIL_SCREEN, { pokemonName: item.name })}
            style={styles.itemContainer}
        >
            <ImageComponent
                style={styles.image}
                source={{ uri: `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/${item.url.substring(item.url.lastIndexOf('pokemon'), item.url.length - 1)}.png` }}
            />
            <TextComponent
                style={styles.text}
            >
                {item.name}
            </TextComponent>
        </TouchableComponent>
    ), [styles.image, styles.itemContainer, styles.text]);

    return (
        <View style={[styles.homeContainer, { backgroundColor: themeColors.color_app_background }]}>
            <FlatListComponent
                data={data}
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
            <ButtonComponent
                title='Refresh'
                onPress={onRefresh}
            />
        </View>
    );
};

export default memo(PokemonListScreen);

const stylesF = (Dimens: DimensType) =>
    StyleSheet.create({
        image: { width: Dimens.H_50, height: Dimens.H_50 },
        itemContainer: { alignItems: 'center', marginTop: Dimens.H_16 },
        homeContainer: {
            flex: 1,
            paddingHorizontal: Dimens.W_16,
            paddingTop: Dimens.COMMON_HEADER_PADDING - Dimens.COMMON_HEADER_PADDING_EXTRA
        },
        text: {
            textAlignVertical: 'center',
        },
    });