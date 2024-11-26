import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClassItem {
  id: string;
  className: string;
  totalPlaces: number;
  seatsLeft: number; 
}

interface ClassesState {
  classesData: ClassItem[];
}

const initialState: ClassesState = {
  classesData: [],
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setClasses: (state, action: PayloadAction<ClassItem[]>) => {
      state.classesData = action.payload;
    },
  },
});

export const { setClasses } = classesSlice.actions;
export default classesSlice.reducer;
