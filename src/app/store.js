import { configureStore } from "@reduxjs/toolkit";
// import reducers
import topicsReducer from '../features/topics/topicsSlice'
import quizzesReducer from '../features/quizzes/quizzesSlice';

// Create a Redux store with the configureStore API
export default configureStore({
  reducer: {
    // Add the topicsReducer under the "topics" key
    topics: topicsReducer,
    quizzes: quizzesReducer
  },
});
