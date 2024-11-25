import * as React from "react";
import api from "../../../api/api";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import { setStudents } from "../../../redux/studentSlice";
import { useStyles } from "./ListOfStudentsComponent.styles";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ColumnData, IStudent } from "../../../interfaces/student.interface";
import AssignToClass from "../AssignToClassComponent/AssignToClassComponent";

const fetchStudents = async (): Promise<IStudent[]> => {
  const response = await api.get("/students");
  return response.data;
};

const columns: ColumnData[] = [
  { width: 150, label: "ID", dataKey: "id" },
  { width: 120, label: "First Name", dataKey: "firstName" },
  { width: 120, label: "Last Name", dataKey: "lastName" },
  { width: 50, label: "Age", dataKey: "age", numeric: true },
  { width: 150, label: "Profession", dataKey: "profession" },
  { width: 150, label: "Assign", dataKey: "assign" },
  { width: 100, label: "Delete", dataKey: "delete" },
];

// TableVirtuoso Components
const VirtuosoTableComponents: TableComponents<IStudent> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const fixedHeaderContent = () => {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableCellHeader}>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          style={{ width: column.width }}
          className={classes.tableCellHeader}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
};

const ListOfStudentsTable: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [studentId, setStudentId] = React.useState<string>("");
  const queryClient = useQueryClient();
  const classes = useStyles();
  const dispatch = useDispatch();

  const students = useSelector(
    (state: RootState) => state.students.studentsData
  );

  const { isLoading, isError, error } = useQuery<IStudent[]>(
    ["students"],
    fetchStudents,
    {
      onSuccess: (data) => {
        dispatch(setStudents(data)); 
      },
    }
  );

  
  const deleteStudent = useMutation(
    async (id: string) => {
      await api.delete(`/students/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("students"); 
      },
    }
  );

  const handleClickOpen = (studentId: string) => {
    setStudentId(studentId);
    setOpenDialog(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
    );

  const rowContent = (_index: number, row: IStudent) => (
    <React.Fragment>
      {columns.map((column) => {
        if (column.dataKey === "assign") {
          return (
            <TableCell key={column.dataKey} className={classes.tableCell}>
              {!row.classId && (
                <Button
                  className={classes.button}
                  variant="outlined"
                  onClick={() => handleClickOpen(row.id)}
                  disabled={!!row.classId}
                >
                  Assign to Class
                </Button>
              )}
            </TableCell>
          );
        }
        if (column.dataKey === "delete") {
          return (
            <TableCell key={column.dataKey} className={classes.tableCell}>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => deleteStudent.mutate(row.id)}
              >
                Delete
              </Button>
            </TableCell>
          );
        }
        return (
          <TableCell key={column.dataKey} className={classes.tableCell}>
            {row[column.dataKey as keyof IStudent]}
          </TableCell>
        );
      })}
    </React.Fragment>
  );

  return (
    <>
      <Paper className={classes.paper}>
        <TableVirtuoso
          data={students}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>

      <AssignToClass
        studentId={studentId}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
};

export default ListOfStudentsTable;
