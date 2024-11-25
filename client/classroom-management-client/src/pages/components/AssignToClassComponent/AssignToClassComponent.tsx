import React from "react";
import {
  Dialog,
  List,
  DialogTitle,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import api from "../../../api/api";
import { RootState } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setClasses } from "../../../redux/classesSlice";
import { useStyles } from "./AssignToClassComponent.styles";
import { assignStudentToClass } from "../../../redux/studentSlice";
import { School as SchoolIcon, Add as AddIcon } from "@mui/icons-material";
import { SutdentsForClassProps } from "../../../interfaces/student.interface";

const AssignToClass: React.FC<SutdentsForClassProps> = ({
  onClose,
  open,
  studentId,
}) => {
  const dispatch = useDispatch();
  const classrooms = useSelector(
    (state: RootState) => state.classes.classesData
  );
  const classes = useStyles();

  // Fetch classes if not already in state
  if (classrooms.length === 0) {
    api
      .get("/classes")
      .then((response) => dispatch(setClasses(response.data)))
      .catch((error) => console.error("Error fetching classes:", error));
  }

  const handleClose = () => {
    onClose();
  };

  const handleAssignStudentToClass = async (
    studentId: string,
    classId: string
  ) => {
    try {
      // Assign student to class via API
      await api.post("/students/assign-to-class", { studentId, classId });

      // Update Redux with new assignment
      dispatch(assignStudentToClass({ studentId, classId }));

      // Update classes state to reflect reduced seats
      const updatedClassrooms = classrooms.map((classItem) =>
        classItem.id === classId
          ? { ...classItem, seatsLeft: classItem.seatsLeft - 1 }
          : classItem
      );
      dispatch(setClasses(updatedClassrooms));

      onClose();
    } catch (error) {
      console.error("Error assigning student to class:", error);
    }
  };

  const availableClasses = classrooms.filter(
    (classItem) => classItem.seatsLeft > 0
  );

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className={classes.dialog_text}>
        Available Classes
      </DialogTitle>
      <List>
        {availableClasses.map((classItem) => (
          <ListItem
            key={classItem.id}
            disableGutters
            className={classes.class_item}
          >
            <ListItemAvatar className={classes.list_item_avatar}>
              <Avatar>
                <SchoolIcon className={classes.schoolIcon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={classItem.className} />
            <IconButton
              onClick={() =>
                handleAssignStudentToClass(studentId, classItem.id)
              }
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

export default AssignToClass;
