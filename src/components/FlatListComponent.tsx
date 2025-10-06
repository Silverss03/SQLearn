import React, {
    forwardRef,
    Fragment,
    memo,
    MutableRefObject,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useRef,
} from 'react';

import debounce from 'lodash/debounce';
import {
    FlatList,
    FlatListProps,
    ScrollViewProps,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import ListFooterLoading from './ListFooterLoading';

interface IProps extends FlatListProps<any> {
    isKeyboardAware?: boolean;
    hasNext?: boolean;
    textEmpty?: string;
    loading?: boolean;
    iconEmpty?: ReactNode;
}

const FlatListComponent = forwardRef<FlatList, IProps>(
        (
                {
                    isKeyboardAware,
                    hasNext,
                    ListFooterComponent,
                    onEndReached,
                    textEmpty,
                    ListEmptyComponent,
                    loading,
                    iconEmpty,
                    data,
                    ...rest
                },
                ref,
        ) => {
            const keyExtractor = useCallback(
                    (_: any, index: number) => index.toString(),
                    [],
            );
            const refFlatList = useRef<FlatList>();

            useImperativeHandle(ref, () => refFlatList.current as FlatList);

            const onScrollToIndexFailed = useCallback(
                    (info: {
                index: number;
                highestMeasuredFrameIndex: number;
                averageItemLength: number;
            }) => {
                        refFlatList.current?.scrollToOffset({
                            offset: info.averageItemLength * info.index,
                            animated: true,
                        });
                        debounce(
                                () =>
                                    refFlatList.current?.scrollToIndex({
                                        index: info.index,
                                        animated: true,
                                    }),
                                100,
                        )();
                    },
                    [],
            );

            const listFooterComponent = useCallback(
                    () =>
                !!onEndReached && !!hasNext && data?.length ? (
                    <ListFooterLoading canLoadMore={hasNext} />
                ) : (
                    <Fragment />
                ),
                    [data?.length, hasNext, onEndReached],
            );

            const renderScrollComponent = useCallback(
                    (props: ScrollViewProps) => <KeyboardAwareScrollView {...props} />,
                    [],
            );

            const listEmptyComponent = useCallback(
                    () =>
                        !hasNext &&
                !loading && (
                            <View style={styles.viewEmpty}>
                                {iconEmpty}
                                {!!textEmpty && (
                                    <Text style={styles.textEmpty}>{textEmpty}</Text>
                                )}
                            </View>
                        ),
                    [hasNext, iconEmpty, loading, textEmpty],
            );

            return (
                <FlatList
                    data={data}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={keyExtractor}
                    renderScrollComponent={
                    isKeyboardAware ? renderScrollComponent : undefined
                    }
                    ref={refFlatList as MutableRefObject<FlatList>}
                    onScrollToIndexFailed={onScrollToIndexFailed}
                    ListFooterComponent={ListFooterComponent || listFooterComponent}
                    onEndReached={onEndReached}
                    ListEmptyComponent={ListEmptyComponent || listEmptyComponent}
                    {...rest}
                />
            );
        },
);

const styles = StyleSheet.create({
    viewEmpty: { alignItems: 'center', marginTop: 50 },
    textEmpty: {
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 30,
        paddingHorizontal: 35,
    },
});

export default memo(FlatListComponent);
