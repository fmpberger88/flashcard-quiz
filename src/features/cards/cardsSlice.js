import { createSlice, createSelector } from "@reduxjs/toolkit";

// initialState
const initialState = {
    cards: {
        '789': {
            id: '789',
            front: 'front text',
            back: 'back text'
        },
        '101': {
            id: '101',
            front: 'front text',
            back: 'back text'
        },
        '102': {
            id: '102',
            front: 'front text',
            back: 'back text'
        },
    }
};

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        // Action to create a new Card
        addCard: (state, action) => {
            const { id, front, back } = action.payload;
            state.cards[id] = { id, front, back };
        },
        // Action, to update Cards
        updateCard: (state, action) => {
            const { id, front, back  } = action.payload;
            if (state.cards[id]) {
                state.cards[id] = {
                    ...state.cards[id],
                    front: front ?? state.cards.front,
                    back: back ?? state.cards.back
                }
            }
        },
        // Action to delete Card
        deleteCard: (state, action) => {
            const { id } = action.payload;
            if (state.cards[id]) {
                delete state.cards[id];
            }
        }
    }
});

// Export Actions
export const { addCard, updateCard, deleteCard} = cardsSlice.actions;

// Selector to get all Cards
export const selectAllCards = (state) => state.cards.cards;

// Memoized Selector um eine bestimmte Karte über die ID zu holen
export const selectCardById = createSelector(
    [selectAllCards, (state, cardId) => cardId],
    (cards, cardId) => cards[cardId]
);

// Exportieren Sie den Reducer
export default cardsSlice.reducer;
