import { useState } from "react";
import api from "../../../api/api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "react-query";

const addClass = async (newClass: { id: string; className: string; totalPlaces: number }) => {
  const response = await api.post("/classes", newClass);
  return response.data;
};

const CreateClassForm = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    id: "",
    className: "",
    totalPlaces: 0,
  });

  const mutation = useMutation(addClass, {
    onSuccess: () => {
      queryClient.invalidateQueries("classes");
    },
    onError: (error) => {
      console.error("Error creating class:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(formData); 
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        label="ID"
        variant="outlined"
        value={formData.id}
        onChange={(e) => setFormData((prev) => ({ ...prev, id: e.target.value }))}
      />
      <TextField
        required
        id="className"
        label="Class Name"
        variant="outlined"
        value={formData.className}
        onChange={(e) => setFormData((prev) => ({ ...prev, className: e.target.value }))}
      />
      <TextField
        required
        id="totalPlaces"
        label="Max Seats"
        variant="outlined"
        type="number"
        value={formData.totalPlaces}
        onChange={(e) => setFormData((prev) => ({ ...prev, totalPlaces: parseInt(e.target.value) }))}
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
