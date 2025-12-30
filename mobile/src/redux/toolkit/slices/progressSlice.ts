import { createSlice } from '@reduxjs/toolkit';
import { TopicProgress, OverallProgress } from '@src/network/dataTypes/progress-types';

interface State {
    topicsProgress: TopicProgress[];
    overallProgress: OverallProgress | null;
}

const initialState: State = {
    topicsProgress: [],
    overallProgress: null,
};

const progressSlice = createSlice({
    name: 'progressSlice',
    initialState,
    reducers: {
        setTopicsProgress: (state, { payload }: { payload: TopicProgress[] }) => {
            state.topicsProgress = payload;
        },
        updateTopicProgress: (state, { payload }: { payload: TopicProgress }) => {
            const index = state.topicsProgress.findIndex((p) => p.topic_id === payload.topic_id);
            if (index !== -1) {
                state.topicsProgress[index] = payload;
            } else {
                state.topicsProgress.push(payload);
            }
        },
        setOverallProgress: (state, { payload }: { payload: OverallProgress }) => {
            state.overallProgress = payload;
        },
        clearProgress: (state) => {
            state.topicsProgress = [];
            state.overallProgress = null;
        },
    },
});

export default progressSlice;
