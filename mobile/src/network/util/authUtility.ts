import { setHeaderToken } from '@network/axios';
import { AuthType } from '@network/dataTypes/auth-types';
import store from '@redux/store/index';
import { SCREENS } from '@src/navigation/config/screenName';
import NavigationService from '@src/navigation/NavigationService';
import { StorageActions } from '@src/redux/toolkit/actions/storageActions';
import { logError } from '@src/utils/logger';

export const handleLogin = (userData: AuthType.User) => {
    setHeaderToken(userData?.token);
    store.dispatch(StorageActions.setStorageUserData(userData));
};

export const handleLoginSocial = (userData: AuthType.User) => {
    handleLogin(userData);
};

const handleLogoutSocial = async () => {
    try {
        // const [isLoginGoogle, isLoginFacebook] = await Promise.all([
        //     GoogleSignin.isSignedIn(),
        //     AccessToken.getCurrentAccessToken(),
        // ]);

        // if (isLoginGoogle) {
        //     GoogleSignin.signOut();
        // }

        // if (isLoginFacebook) {
        //     LoginManager.logOut();
        // }

    } catch (error) {
        logError(error);
    }
};

export const handleLogout = async () => {
    // notifee.cancelAllNotifications();

    // FireBaseMessaging().deleteToken(),

    store.dispatch(StorageActions.removeStorageUserData());
    setHeaderToken('');

    handleLogoutSocial();

    // reset all navigation when logout
    NavigationService.reset(SCREENS.BOTTOM_TAB_SCREEN);
};

export const updateUserData = (newData: AuthType.User) => {
    const storageData = store.getState().storageReducer.userData;
    store.dispatch(StorageActions.setStorageUserData({ ...storageData, ...newData }));
};

export const updateUserDataToken = (newToken: any) => {
    const storageData = store.getState().storageReducer.userData;
    store.dispatch(StorageActions.setStorageUserData({ ...storageData, token: newToken }));
};

export async function loginWithFaceBook() {
    // try {
    //     // Attempt login with permissions
    //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    //     if (result.isCancelled) {
    //         return Promise.reject({ isCancelled: true });
    //     }

    //     // Once signed in, get the users AccesToken
    //     const data = await AccessToken.getCurrentAccessToken();

    //     if (!data) {
    //         throw 'Something went wrong when obtaining access token';
    //     }

    //     return data.accessToken;
    // } catch (error) {
    //     logError(error);
    //     return Promise.reject(error);
    // }
}

export async function loginWithGoogle() {
    // try {
    //     await GoogleSignin.signIn();

    //     return GoogleSignin.getTokens();

    // } catch (error) {
    //     logError(error);
    //     return Promise.reject(error);
    // }
}

export async function loginWithApple() {
    // try {
    //     // Start the sign-in request
    //     const appleAuthRequestResponse = await AppleAuth.performRequest({
    //         requestedOperation: AppleAuth.Operation.LOGIN,
    //         requestedScopes: [AppleAuth.Scope.FULL_NAME, AppleAuth.Scope.EMAIL],
    //     });

    //     // Ensure Apple returned a user identityToken
    //     if (!appleAuthRequestResponse.identityToken) {
    //         return Promise.reject();
    //     }

    //     return appleAuthRequestResponse;

    // } catch (error) {
    //     logError(error);
    //     return Promise.reject(error);
    // }
}