import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Box, Grid } from "@mui/material";

import Navbar from "../components/NavbarComponent/NavbarComponent";
import StudentCard from "../components/CardComponent/CardComponent";
import { Sidebar } from "../components/SideMenuComponent/SideMenuComponent";

import api from "../../api/api";
import { AppDispatch } from "../../redux/store";
import { setClasses } from "../../redux/classesSlice";

import { useStyles } from "./Classes.style";
import { IStudent } from "../../interfaces/student.interface";
import { ClassItem } from "../../interfaces/class.interface";

const Classes: React.FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const classesStyle = useStyles();


  const fetchClasses = async (): Promise<ClassItem[]> => {

    const [classesResponse, studentsResponse] = await Promise.all([
      api.get("/classes"),
      api.get("/students"),
    ]);

    const classes = classesResponse.data;
    const students = studentsResponse.data;


    const studentsByClass = students.reduce(
      (acc: Record<string, IStudent[]>, student: IStudent) => {
        acc[student.classId] = acc[student.classId] || [];
        acc[student.classId].push(student);
        return acc;
      },
      {}
    );

    
    return classes.map((classItem: ClassItem) => ({
      ...classItem,
      seatsLeft: classItem.totalPlaces - (studentsByClass[classItem.id]?.length || 0),
    }));
  };


  const {
    data: classes,
    isLoading,
    error,
  } = useQuery<ClassItem[], Error>(["classes"], fetchClasses, {
    onSuccess: (data) => {
      dispatch(setClasses(data)); 
    },
  });

  
  const handleMenuClick = (): void => {
    setIsSideBarOpen((prevState) => !prevState);
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading classes</p>;

  return (
    <Box>
      <Sidebar open={isSideBarOpen} onClose={handleMenuClick} />
      <Box className={classesStyle.box}>
      <Navbar onMenuClick={handleMenuClick} />
        <Grid className={classesStyle.gridContainer}>
          {classes?.map((classItem) => (
            <Grid item key={classItem.id}>
              <StudentCard
                classId={classItem.id}
                className={classItem.className}
                totalSeats={classItem.totalPlaces}
                seatsLeft={classItem.seatsLeft}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Classes;
