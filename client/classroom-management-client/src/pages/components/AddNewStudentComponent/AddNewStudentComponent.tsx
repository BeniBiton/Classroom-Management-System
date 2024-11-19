import api from "../../../api/api";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "react-query";

const addStudent = async (newStudent: {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  profession: string;
}) => {
  const response = await api.post("/students", newStudent);
  return response.data;
};

const AddStudentForm = () => {
  const queryClient = useQueryClient();

  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [profession, setProfession] = useState("");

  const mutation = useMutation(addStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
    },
    onError: (error) => {
      console.error("Error creating class:", error);
    },
  });

  const handSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ id, firstName, lastName, age, profession });
  };

  return (
    <Box
      component="form"
      onSubmit={handSumbit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": { m: 1, width: "300px" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="student-id"
        label="ID"
        variant="outlined"
        onChange={(e) => setId(e.target.value)}
      />
      <TextField
        required
        id="first-name"
        label="First Name"
        variant="outlined"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        required
        id="last-name"
        label="Last Name"
        variant="outlined"
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        id="age"
        label="Age"
        variant="outlined"
        type="number"
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
      <TextField
        required
        id="profession"
        label="Profession"
        variant="outlined"
        onChange={(e) => setProfession(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "300px" }}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Creating..." : "Create Student"}
      </Button>
    </Box>
  );
};

export default AddStudentForm;
