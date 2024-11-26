// hooks/useFetchClasses.ts
import { useDispatch } from "react-redux";
import { setClasses } from "../redux/classesSlice";
import { useQuery } from "react-query";
import api from "../api/api";
import { AppDispatch } from "../redux/store";

const fetchClasses = async () => {
  const response = await api.get("/classes");
  return response.data;
};

export const useFetchClasses = () => {
  const dispatch = useDispatch<AppDispatch>();

  const query = useQuery("classes", fetchClasses, {
    onSuccess: (data) => {
      dispatch(setClasses(data)); // Sync to Redux on successful fetch
    },
    refetchOnWindowFocus: false, // Disable refetch on window focus for efficiency
  });

  return query; // Return query state
};
