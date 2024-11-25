import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles(() => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)", 
    gap: "1rem", 
    padding: "5rem",
    paddingLeft: "1.8rem"
  },
  box: {
    flexGrow: "1 !important"
  }
}));


