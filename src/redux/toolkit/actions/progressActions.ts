import progressSlice from '../slices/progressSlice';

export const { reducer } = progressSlice;

export const ProgressActions = {
    ...progressSlice.actions,
};

export type TypesActions = typeof progressSlice.actions;
export type TypesState = ReturnType<typeof reducer>;
