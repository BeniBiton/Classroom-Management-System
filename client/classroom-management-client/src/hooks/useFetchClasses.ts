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

  useQuery("classes", fetchClasses, {
    onSuccess: (data) => {
      dispatch(setClasses(data));
    },
    refetchOnWindowFocus: false,
  });
};
