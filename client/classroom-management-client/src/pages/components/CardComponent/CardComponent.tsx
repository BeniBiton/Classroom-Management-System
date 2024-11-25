import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState, useCallback } from "react";
import { RootState } from "../../../redux/store";
import Typography from "@mui/material/Typography";
import { useStyles } from "./CardComponent.styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { setStudents } from "../../../redux/studentSlice";
import api, { handleStudentsByClass } from "../../../api/api";
import { useThemeContext } from "../../../themes/ThemeContext";
import { StudentCardProps } from "../../../interfaces/student.interface";
import StudentsListInClass from "../StudntsInClassList/StudentsInClassList";

const StudentCard: React.FC<StudentCardProps> = ({
  className,
  seatsLeft,
  totalSeats,
  classId,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isBlueTheme } = useThemeContext();
  const [openDialog, setOpenDialog] = useState(false);

  const students = useSelector((state: RootState) =>
    state.students.studentsData.filter((student) => student.classId === classId)
  );

  const fetchStudentsListInClass = useCallback(async () => {
    try {
      const fetchedStudents = await handleStudentsByClass(classId);
      dispatch(setStudents(fetchedStudents));
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, [classId, dispatch]);

  const handleOpenDialog = useCallback(async () => {
    await fetchStudentsListInClass();
    setOpenDialog(true);
  }, [fetchStudentsListInClass]);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    queryClient.invalidateQueries("classes"); 
  }, [queryClient]);

  // Delete class mutation
  const deleteClassMutation = useMutation(
    async (id: string) => {
      await api.delete(`/classes/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("classes"); 
      },
      onError: (error) => {
        console.error("Error deleting class:", error);
      },
    }
  );

  return (
    <>
      <Card
        className={classes.card_style}
      >
        <CardContent>
          <Typography
            className={classes.title}
            variant="h6"
            component="div"
          >
            {className}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={classes.contant}>
            {`There are ${seatsLeft} seats left`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {`out of ${totalSeats}`}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" className={classes.button} onClick={handleOpenDialog}>
            Students List
          </Button>
          <DeleteIcon
            onClick={() => deleteClassMutation.mutate(classId)}
            sx={{
              color: isBlueTheme ? "#3f50b5" : "#f44336",
              cursor: "pointer",
            }}
          />
        </CardActions>
      </Card>

      <StudentsListInClass
        open={openDialog}
        onClose={handleCloseDialog}
        students={students}
      />
    </>
  );
};

export default StudentCard;
