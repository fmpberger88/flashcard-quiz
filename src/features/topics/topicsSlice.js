import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    topics: {
        '123': {
            id: '123',
            name: 'example topic',
            icon: 'icon url',
            quizIds: ['456']
        }
    }
};

export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        addTopic(state, action) {
            const { id, name, icon } = action.payload;
            state.topics[id] = {
                id,
                name,
                icon,
                quizIds: []
            };
        },
        updateTopic(state, action) {
            const { id, name, icon, quizIds } = action.payload;
            if (state.topics[id]) {
                state.topics[id] = {
                    ...state.topics[id],
                    name: name ?? state.topics[id].name,
                    icon: icon ?? state.topics[id].icon,
                    quizIds: quizIds ?? state.topics[id].quizIds
                };
            }
        },
        deleteTopic(state, action) {
            const { id } = action.payload;
            if (state.topics[id]) {
                delete state.topics[id];
            }
        },
        addQuizToTopic(state, action) {
            const { topicId, quizId } = action.payload;
            if (state.topics[topicId]) {
                if (!state.topics[topicId].quizIds.includes(quizId)) {
                    state.topics[topicId].quizIds.push(quizId);
                }
            }
        }
    }
});

export const { addTopic, updateTopic, deleteTopic, addQuizToTopic } = topicsSlice.actions;

export const selectAllTopics = state => state.topics.topics;

export const selectTopicById = createSelector(
    [selectAllTopics, (state, topicId) => topicId],
    (topics, topicId) => topics[topicId]
);

export default topicsSlice.reducer;
