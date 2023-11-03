// Import functions form Redux Toolkit
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
        // Action to create new Quizzes
        addQuiz: (state, action) => {
            const { id, topicId, name, cardIds }= action.payload;
            state.quizzes[id] = { id, topicId, name, cardIds };
        },
        // Action to update Quizzes
        updateQuizz: (state, action) => {
            const { id, topicId, name, cardIds } = action.payload
            if (state.quizzes[id]) {
                state.quizzes[id] = {
                    ...state.quizzes[id],
                    topicId: topicId ?? state.quizzes[id].topicId,
                    name: name ?? state.quizzes.name,
                    cardIds: cardIds ?? state.quizzes.cardIds
                };
            }
        },
        // Action to delete Quizzes
        deleteQuiz: (state, action) => {
            const { id } = action.payload;
            if (state.topics[id]) {
                delete state.topics[id];
            }
        }
    }
});

// Export Actions
export const { addQuiz, updateQuiz, deleteQuiz } = quizzesSlice.actions;

// Selector to get all quizzes
export const selectAllQuizzes = (state) => state.quizzes.quizzes;

// Memoized Selector um ein bestimmtes Quiz über die ID zu holen
export const selectQuizById = createSelector(
    [selectAllQuizzes, (state, quizId) => quizId],
    (quizzes, quizId) => quizzes[quizId]
);

// Exportieren Sie den Reducer
export default quizzesSlice.reducer;