import { useState } from "react";
import Box from "@mui/material/Box";
import { useStyles } from "./CreateNewStudentsAndClasses.styles";
import Navbar from "../components/NavbarComponent/NavbarComponent";
import AddStudentForm from "../components/AddNewStudentComponent/AddNewStudentComponent";
import CreateClassForm from "../components/CreateNewClassComponent/CreateNewClassComponent";
import { Sidebar } from "../components/SideMenuComponent/SideMenuComponent";

const CreateNewStudentsAndClasses = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const classes = useStyles();

  const handleMenuClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <Box>
      <Sidebar open={isSideBarOpen} onClose={handleMenuClick} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: 2,
          height: "100vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Navbar onMenuClick={handleMenuClick} />
        <Box
          className={classes.formsContainer}
          sx={{ width: "50%", maxWidth: "500px" }}
        >
          <h2 className={classes.headline}>Create new class</h2>
          <CreateClassForm />
        </Box>

        <Box
          className={classes.formsContainer}
          sx={{ width: "50%", maxWidth: "500px" }}
        >
          <h2 className={classes.headline}>Add new student</h2>
          <AddStudentForm />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNewStudentsAndClasses;
