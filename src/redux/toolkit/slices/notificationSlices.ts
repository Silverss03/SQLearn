import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationTypes } from '@src/network/dataTypes/notification-types';
import { getNotificationListThunk, getUnreadNotificationCountThunk, markNotificationsAsReadThunk } from '../thunks/notificationThunks';

interface State {
    showGlobalNotification: boolean;
    unreadCount: number;
    notifications: NotificationTypes.Notification[];
    isLoading: boolean;
}

const initialState: State = {
    showGlobalNotification: false,
    unreadCount: 0,
    notifications: [],
    isLoading: false,
};

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
        showGlobalNotification: (state, action: PayloadAction<boolean>) => {
            state.showGlobalNotification = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUnreadNotificationCountThunk.fulfilled, (state, action) => {
                if (action.payload) {
                    state.unreadCount = action.payload.unreadCount;
                    state.showGlobalNotification = action.payload.shouldShowGlobalNotification;
                }
            })
            .addCase(getNotificationListThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotificationListThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.notifications = action.payload;
                }
            })
            .addCase(getNotificationListThunk.rejected, (state) => {
                state.isLoading = false;
            })
    },
});

export default notificationSlice;
