import { createSlice } from '@reduxjs/toolkit';

interface State {
    completedExercises: number[];
}

const initialState: State = {
    completedExercises: [],
};

const exerciseSlice = createSlice({
    name: 'exerciseSlice',
    initialState,
    reducers: {
        addCompletedExercise: (state, { payload }: { payload: number }) => {
            if (!state.completedExercises.includes(payload)) {
                state.completedExercises.push(payload);
            }
        },
    },
});

export default exerciseSlice;