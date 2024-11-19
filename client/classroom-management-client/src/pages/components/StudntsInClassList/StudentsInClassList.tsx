import * as React from "react";
import api from "../../../api/api";
import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useMutation, useQueryClient } from "react-query";
import { StudentProps } from "../../../interfaces/student.interface";
import { useThemeContext } from "../../../themes/ThemeContext";
import { useStyles } from "./StudentInClass.styles";
import { useEffect } from "react";

const StudentsForClass = ({ open, onClose, students }: StudentProps) => {
  const [localStudents, setLocalStudents] = React.useState(students);
  const queryClient = useQueryClient();
  const { isBlueTheme } = useThemeContext();
  const classes = useStyles();

  useEffect(() => {
    setLocalStudents(students);
  }, [students]);

  const unassignStudent = useMutation(
    async (studentId: string) => {
      await api.patch(`/students/${studentId}/unassign`, { classId: null });
    },
    {
      onSuccess: (_, studentId) => {
        setLocalStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentId)
        );
        queryClient.invalidateQueries("students");
      },
    }
  );

  const handleUnassign = (studentId: string) => {
    unassignStudent.mutate(studentId);
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        className: classes.dialog,
      }}
    >
      <DialogTitle className={classes.dialogTitle}>Class Students</DialogTitle>
      <List>
        {localStudents.length > 0 ? (
          localStudents.map((student) => (
            <ListItem className={classes.listItem} key={student.id}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${student.firstName} ${student.lastName}`}
                primaryTypographyProps={{ className: classes.listItemText }}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleUnassign(student.id)}
                sx={{
                  color: isBlueTheme ? "blue" : "red",
                }}
              >
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary="This class empty"
              primaryTypographyProps={{
                className: classes.emptyStateText,
              }}
            />
          </ListItem>
        )}
      </List>
    </Dialog>
  );
};

export default StudentsForClass;
