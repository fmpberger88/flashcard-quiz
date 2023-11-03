// Import necessary functions from Redux Toolkit
import { createSlice, createSelector } from "@reduxjs/toolkit";

// Initial state for the topics Slice
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

// Create a topics slice with reducers and actions
export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        // Action to add a new topic
        addTopic(state, action) {
            const { id, name, icon } = action.payload;
            state.topics[id] = {
                id,
                name,
                icon,
                quizIds: [] // Initialize with an empty array
            };
        },
        // Action to update an existing topic
        updateTopic(state, action) {
            const { id, name, icon, quizIds } = action.payload;
            if (state.topics[id]) {
                state.topics[id] = {
                    ...state.topics[id],
                    name: name ?? state.topics[id].name,
                    icon: icon == state.topics[id].icon,
                    quizIds: quizIds ?? state.topics[id].quizIds
                };
            }
        },
        // Action to delete a topic
        deleteTopic(state, action) {
            const { id } = action.payload;
            if (state.topics[id]) {
                delete state.topics[id];
            }
        }
    }
});

// Export the action creators
export const { addTopic, updateTopic, deleteTopic } = topicsSlice.actions;

// A selector to get all topics
export const selectAllTopics = state => state.topics.topics;

// A memoized selector to get a specific topic by ID using createSelector from Reselect
export const selectTopicsByID = createSelector(
    [selectAllTopics, (state, topicId) => topicId],
    (topics, topicId) => topics[topicId]
);

// Export the reducer
export default topicsSlice.reducer;