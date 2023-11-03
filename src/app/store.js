import { configureStore } from "@reduxjs/toolkit";
// import reducers
import topicsReducer from '../features/topics/topicsSlice'
import quizzesReducer from '../features/quizzes/quizzesSlice';
import cardsSlice from '../features/cards/cardsSlice'

// Create a Redux store with the configureStore API
export default configureStore({
  reducer: {
    // Add the topicsReducer under the "topics" key
    topics: topicsReducer,
    quizzes: quizzesReducer,
    cards: cardsSlice
  },
});
