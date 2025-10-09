// import 'dayjs/locale/vi';
import '@languages/index';

import React, { useCallback } from 'react';

import dayjs from 'dayjs';
import {
    StatusBar,
    StyleSheet,
} from 'react-native';
import codePush from 'react-native-code-push';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { DEFAULT_LANGUAGE } from '@languages/index';
import NavigationWrapper from '@navigation/index';
import store, { persistor } from '@redux/store';
import { IS_ANDROID } from '@src/configs/constants';
import {
    setCustomFlatList,
    setCustomScrollView,
    setCustomSectionList,
    setCustomText,
    setCustomTextInput,
} from '@utils/customs/defaultPropsComponent';
import { setHeaderToken } from '@src/network/axios';

dayjs.locale(DEFAULT_LANGUAGE);

enableScreens();

setCustomFlatList({
    keyExtractor: (item: any, index: number) => index.toString(),
    showsHorizontalScrollIndicator: false,
});
setCustomSectionList({
    keyExtractor: (item: any, index: number) => index.toString(),
    stickySectionHeadersEnabled: true,
    showsHorizontalScrollIndicator: false,
});
setCustomScrollView({
    showsHorizontalScrollIndicator: false
});
setCustomText({
    allowFontScaling: false
});
setCustomTextInput({
    autoCorrect: false,
    spellCheck: false,
    allowFontScaling: false,
    underlineColorAndroid: 'transparent',
});

const App = () => {
    if (IS_ANDROID) {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
    }

    const onBeforeLift = useCallback(async () => {
        // Get the persisted state and set the token in axios headers IMMEDIATELY
        const state = store.getState();
        const userData = state.storageReducer?.userData;
        if (userData?.access_token) {
            setHeaderToken(userData.access_token);
        }
    }, []);

    return (
        <Provider store={store}>
            <PersistGate
                loading={null}
                onBeforeLift={onBeforeLift}
                persistor={persistor}
            >
                <SafeAreaProvider>
                    <GestureHandlerRootView style={styles.container}>
                        <NavigationWrapper />
                    </GestureHandlerRootView>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default codePush({
    updateDialog: !__DEV__,
    installMode: !__DEV__ ? codePush.InstallMode.IMMEDIATE : codePush.CheckFrequency.ON_APP_RESUME,
})(App);
