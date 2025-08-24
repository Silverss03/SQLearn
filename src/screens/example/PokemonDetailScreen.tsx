import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import {
    StyleSheet,
    View,
} from 'react-native';
import { useEffectOnce } from 'react-use';

import { useRoute } from '@react-navigation/native';
import ButtonComponent from '@src/components/ButtonComponent';
import ImageComponent from '@src/components/ImageComponent';
import TextComponent from '@src/components/TextComponent';
import useCallAPI from '@src/hooks/useCallAPI';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import { PokemonDetailScreenProps } from '@src/navigation/NavigationRouteProps';
import NavigationService from '@src/navigation/NavigationService';
import { getPokemonDetailService } from '@src/network/services/pokemonServices';
import { useAppDispatch } from '@src/hooks';
import { getPokemonDetailThunk } from '@src/redux/toolkit/thunks/pokemonThunks';

const PokemonDetailScreen = () => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { params: screenParams } = useRoute<PokemonDetailScreenProps>();
    const { pokemonName } = screenParams;

    const { callApi: getPokemonDetail, data } = useCallAPI(
            getPokemonDetailService
    );

    useEffectOnce(() => {
        // getPokemonDetail(pokemonName);
        dispatch(getPokemonDetailThunk(pokemonName));
    });

    return (
        <View style={styles.homeContainer}>
            <View
                style={styles.mainContainer}
            >
                <ImageComponent
                    style={styles.image}
                    source={{ uri: `https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/${data?.id}.png` }}
                />
                <TextComponent
                    style={[styles.text, { color: data?.color?.name }]}
                >
                    {pokemonName}
                </TextComponent>
                <TextComponent
                    style={[styles.text, { color: data?.color?.name }]}
                >
                    {data?.flavor_text_entries?.[0].flavor_text}
                </TextComponent>

                <ButtonComponent
                    title={t('Go Back')}
                    onPress={() => NavigationService.goBack()}
                />
            </View>
        </View>
    );
};

export default memo(PokemonDetailScreen);

const stylesF = (Dimens: DimensType) =>
    StyleSheet.create({
        image: { width: Dimens.H_200, height: Dimens.H_200 },
        mainContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Dimens.H_16,
        },
        homeContainer: {
            flex: 1,
            paddingHorizontal: Dimens.W_16,
        },
        text: {
            width: '100%',
            textAlign: 'center',
            marginBottom: Dimens.H_20,
        },
    });