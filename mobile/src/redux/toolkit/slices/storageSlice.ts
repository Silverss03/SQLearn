import { createSlice } from '@reduxjs/toolkit';
import { AuthType } from '@src/network/dataTypes/auth-types';

interface State {
    userData: AuthType.User | null,
}

const initialState: State = {
    userData: null,
};

const storageSlice = createSlice({
    name: 'storageSlice',
    initialState,
    reducers: {
        setStorageUserData: (state, { payload }) => {
            state.userData = payload;
        },
        removeStorageUserData: (state) => {
            state.userData = null;
        },
    },
});

export default storageSlice;
