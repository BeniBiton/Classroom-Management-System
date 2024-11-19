import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import api, { handleStudentsByClass } from "../../../api/api";
import StudentsListInClass from "../StudntsInClassList/StudentsInClassList";
import { StudentCardProps } from "../../../interfaces/student.interface";
import { useDispatch, useSelector } from "react-redux";
import { setStudents } from "../../../redux/studentSlice";
import { RootState } from "../../../redux/store";
import { useThemeContext } from "../../../themes/ThemeContext";

const StudentCard: React.FC<StudentCardProps> = ({
  className,
  seatsLeft,
  totalSeats,
  classId,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isBlueTheme } = useThemeContext();

  const students = useSelector((state: RootState) =>
    state.students.studentsData.filter((student) => student.classId === classId)
  );

  const fetchStudentsListInClass = async () => {
    const fetchedStudents = await handleStudentsByClass(classId);
    dispatch(setStudents(fetchedStudents));
  };

  const handleOpenDialog = async () => {
    await fetchStudentsListInClass();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const deleteClass = useMutation(
    async (id: string) => {
      await api.delete(`/classes/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("classes");
      },
    }
  );

  return (
    <>
      <Card
        sx={{
          width: 200,
          minHeight: 150,
          mx: 2,
          my: 1,
          boxShadow: 6,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            {className}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {`There are ${seatsLeft} seats left`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {`out of ${totalSeats}`}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            size="small"
            sx={{ color: "#000000" }}
            onClick={handleOpenDialog}
          >
            Students List
          </Button>
          <DeleteIcon
            onClick={() => deleteClass.mutate(classId)}
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
