import { configureStore } from '@reduxjs/toolkit';
import classesReducer from './classesSlice';
import studentsReducer from './studentSlice'

const store = configureStore({
  reducer: {
    classes: classesReducer,
    students: studentsReducer,  // Add students reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;