import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./Classes.style";
import { AppDispatch } from "../../redux/store";
import { setClasses } from "../../redux/classesSlice";
import api, { handleStudentsByClass } from "../../api/api";
import { ClassItem } from "../../interfaces/class.interface";
import Navbar from "../components/NavbarComponent/NavbarComponent";
import StudentCard from "../components/CardComponent/CardComponent";
import { Sidebar } from "../components/SideMenuComponent/SideMenuComponent";
import { useState } from "react";

const Classes: React.FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const classesStyle = useStyles();


  const fetchClasses = async (): Promise<ClassItem[]> => {
    const response = await api.get("/classes");
    const classes = response.data;

    const enrichedClasses = await Promise.all(
      classes.map(async (classItem: ClassItem) => {
        const students = await handleStudentsByClass(classItem.id);
        return {
          ...classItem,
          seatsLeft: classItem.totalPlaces - students.length,
        };
      })
    );

    return enrichedClasses;
  };


  const { data: classes, isLoading, error } = useQuery<ClassItem[], Error>(
    ["classes"],
    fetchClasses,
    {
      onSuccess: (data) => {
        dispatch(setClasses(data));
      },
    }
  );

  const handleMenuClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading classes</p>;

  return (
    <Box>
      <Sidebar open={isSideBarOpen} onClose={handleMenuClick} />
      <Box sx={{ flexGrow: 1 }}>
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
