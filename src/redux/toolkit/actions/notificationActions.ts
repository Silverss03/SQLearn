import notificationSlice from '../slices/notificationSlices';

export const { reducer } = notificationSlice;

export const NotificationActions = {
    ...notificationSlice.actions,
};

export type TypesActions = typeof notificationSlice.actions;
export type TypesState = ReturnType<typeof reducer>;