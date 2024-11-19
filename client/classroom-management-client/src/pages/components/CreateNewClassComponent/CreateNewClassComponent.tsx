import api from "../../../api/api";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "react-query";

const addClass = async (newClass: {
  id: string;
  className: string;
  totalPlaces: number;
}) => {
  const response = await api.post("/classes", newClass);
  return response.data;
};

const CreateClassForm = () => {
  const queryClient = useQueryClient();

  const [id, setId] = useState("");
  const [className, setClassName] = useState("");
  const [totalPlaces, setTotalPlaces] = useState(0);

  const mutation = useMutation(addClass, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
    },
    onError: (error) => {
      console.error("Error creating class:", error);
    },
  });

  const handSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ id, className, totalPlaces });
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
        id="id"
        label="id"
        variant="outlined"
        onChange={(e) => setId(e.target.value)}
      />
      <TextField
        required
        id="className"
        label="Class-name"
        variant="outlined"
        onChange={(e) => setClassName(e.target.value)}
      />

      <TextField
        required
        id="max-seats"
        label="Max Seats"
        variant="outlined"
        type="number"
        onChange={(e) => setTotalPlaces(parseInt(e.target.value))}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "300px" }}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Creating..." : "Create Class"}
      </Button>
    </Box>
  );
};

export default CreateClassForm;
