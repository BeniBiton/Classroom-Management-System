import { useState } from "react";
import { Box } from "@mui/material";
import { useStyles } from "./Students.styles";
import Navbar from "../components/NavbarComponent/NavbarComponent";
import { Sidebar } from "../components/SideMenuComponent/SideMenuComponent";
import ListOfStudentsTable from "../components/ListOfStudentsComponent/LIstOfStudentsComponent";


const Students = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const studentsStyles = useStyles();

  const handleMenuClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <Box>
      <Sidebar open={isSideBarOpen} onClose={handleMenuClick} />
      <Box>
        <Navbar onMenuClick={handleMenuClick} />
      </Box>
      <Box className={studentsStyles.table_container}>
        <ListOfStudentsTable />
      </Box>
    </Box>
  );
};

export default Students;
