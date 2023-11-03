// Import functions from Redux Toolkit
import { createSlice, createSelector } from "@reduxjs/toolkit";

// initialState
const initialState = {
    quizzes: {
        '456': {
            id: '456',
            topicId: '123',
            name: 'quiz for example topic',
            cardIds: ['789', '101', '102']
        }
    }
};

// createSlice with actions and reducers
export const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        // Action to add new quiz
        addQuiz: (state, action) => {
            const { id, topicId, name, cardIds } = action.payload;
            state.quizzes[id] = { id, topicId, name, cardIds };
        },
        // Action to update quiz
        updateQuiz: (state, action) => {
            const { id, topicId, name, cardIds } = action.payload;
            if (state.quizzes[id]) {
                state.quizzes[id] = {
                    ...state.quizzes[id],
                    topicId: topicId ?? state.quizzes[id].topicId,
                    name: name ?? state.quizzes[id].name,
                    cardIds: cardIds ?? state.quizzes[id].cardIds
                };
            }
        },
        // Action to delete quiz
        deleteQuiz: (state, action) => {
            const { id } = action.payload;
            if (state.quizzes[id]) {
                delete state.quizzes[id];
            }
        }
    }
});

// Export Actions
export const { addQuiz, updateQuiz, deleteQuiz } = quizzesSlice.actions;

// Selector to get all quizzes
export const selectAllQuizzes = (state) => state.quizzes.quizzes;

// Memoized selector to get a specific quiz by ID
export const selectQuizById = createSelector(
    [selectAllQuizzes, (state, quizId) => quizId],
    (quizzes, quizId) => quizzes[quizId]
);

// Export the reducer
export default quizzesSlice.reducer;
