import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNotificationCountService, getNotificationService, markNotificationAsReadService } from '@src/network/services/notificationServices';
import { NotificationActions } from '../actions/notificationActions';

export const getUnreadNotificationCountThunk = createAsyncThunk(
    'notification/getUnreadNotificationCount',
    async (_, { dispatch }) => {
        try {
            const response = await getNotificationCountService();
            const unreadCount = response.data.data.unread_count;

            const shouldShowGlobalNotification = unreadCount > 0;
            dispatch(NotificationActions.showGlobalNotification(shouldShowGlobalNotification));

            return {
                unreadCount,
                shouldShowGlobalNotification,
            };
        } catch (error) {
            console.error('Error fetching unread notification count:', error);
        }
    }
);

export const getNotificationListThunk = createAsyncThunk(
    'notification/getNotificationList',
    async (_, { }) => {
        try {
            const response = await getNotificationService();
            return response.data.data;
        } catch (error) {
            console.error('Error fetching notification list:', error);
        }
    }
);

export const markNotificationsAsReadThunk = createAsyncThunk(
    'notification/markAsRead',
    async (_, { dispatch }) => {
        try {
            await markNotificationAsReadService();
            
            // Allow some time for backend to update before fetching count
             setTimeout(() => {
                dispatch(getUnreadNotificationCountThunk());
             }, 500);

        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    }
);