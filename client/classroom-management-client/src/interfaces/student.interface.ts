export interface IStudent {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    proffesion: string;
    classId: string;
  }

  export interface StudentProps {
    open: boolean;
    students: IStudent[];
    onClose: (value: string) => void;
  }

  export interface StudentCardProps {
    className: string;
    seatsLeft: number;
    totalSeats: number;
    classId: string;
  }
  
  export interface SutdentsForClassProps {
    open: boolean;
    onClose: () => void;
    studentId: string;
  }

  export interface Data {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    profession: string;
    classId: string
  }
  export interface ColumnData {
    dataKey: keyof Data | "assign" | "delete";
    label: string;
    numeric?: boolean;
    width?: number;
  }