import exercisesSlice from '../slices/exercisesSlice';

export const { reducer } = exercisesSlice;

export const ExerciseActions = {
    ...exercisesSlice.actions,
};

export type TypesActions = typeof exercisesSlice.actions;
export type TypesState = ReturnType<typeof reducer>;