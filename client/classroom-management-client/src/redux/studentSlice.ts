import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStudent } from '../interfaces/student.interface';

interface StudentState {
  studentsData: IStudent[];
}

const initialState: StudentState = {
  studentsData: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<IStudent[]>) => {
      state.studentsData = action.payload;
    },
    assignStudentToClass: (state, action: PayloadAction<{ studentId: string; classId: string }>) => {
      const { studentId, classId } = action.payload;
      const student = state.studentsData.find((student) => student.id === studentId);
      if (student) {
        student.classId = classId;
      }
    },
  },
});

export const { setStudents, assignStudentToClass } = studentSlice.actions;
export default studentSlice.reducer;
