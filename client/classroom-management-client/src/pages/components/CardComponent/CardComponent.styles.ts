import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
export const useStyles = makeStyles(() => ({
  delete_icon: {
    background: "#3f50b5",
    color: "#3f50b5"
  },
  card: {
    
  }
}));


export const blueTheme = createTheme({
  palette: {
    primary: { main: "blue" },
  },
});

export const redTheme = createTheme({
  palette: {
    primary: { main: "red" },
  },
});


