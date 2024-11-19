import { useEffect } from "react";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import { RootState } from "../../../redux/store";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useSelector, useDispatch } from "react-redux";
import { useStyles } from "./AssignToClassComponent.styles";
import { assignStudentToClass } from "../../../redux/studentSlice";
import { SutdentsForClassProps } from "../../../interfaces/student.interface";
import api from "../../../api/api";
import { setClasses } from "../../../redux/classesSlice";

const SutdentsForClass = (props: SutdentsForClassProps) => {
  const { onClose, selectedValue, open, studentId } = props;
  const dispatch = useDispatch();
  const classrooms = useSelector((state: RootState) => state.classes.classesData);
  const classes = useStyles();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get("/classes");
        dispatch(setClasses(response.data)); // Load class data into Redux
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    if (classrooms.length === 0) {
      fetchClasses(); // Fetch classes if not already loaded
    }
  }, [dispatch, classrooms.length]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleAssignStudentToClass = async (studentId: string, classId: string) => {
    try {
      // Call backend to assign student to class
      const response = await api.post("http://localhost:3000/students/assign-to-class", {
        studentId,
        classId,
      });

      console.log("Student assigned to class:", response.data);

      // Update Redux state with the new assignment
      dispatch(assignStudentToClass({ studentId, classId }));

      // Decrease seatsLeft for the assigned class
      const updatedClassrooms = classrooms.map((classItem) =>
        classItem.id === classId
          ? { ...classItem, seatsLeft: classItem.seatsLeft - 1 }
          : classItem
      );
      dispatch(setClasses(updatedClassrooms)); // Update classrooms in Redux

      onClose(classId);
    } catch (error) {
      console.error("Error assigning student to class:", error);
    }
  };

  const handleListItemClick = (studentId: string, classId: string) => {
    handleAssignStudentToClass(studentId, classId);
  };

  // Filter classes with seatsLeft > 0
  const availableClasses = classrooms.filter((classItem) => classItem.seatsLeft > 0);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className={classes.dialog_text}>Available Classes</DialogTitle>
      <List sx={{ pt: 0 }}>
        {availableClasses.map((classItem) => (
          <ListItem className={classes.class_item} disableGutters key={classItem.id}>
            <ListItemAvatar className={classes.list_item_avatar}>
              <Avatar >
                <SchoolIcon className={classes.schoolIcon}/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={classItem.className} />
            <IconButton
              onClick={() => handleListItemClick(studentId, classItem.id)}
              color="primary"
              title="Assign student to class"
            >
              <AddIcon className={classes.icon_button} />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default SutdentsForClass;

