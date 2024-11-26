import { makeStyles } from "@mui/styles";
import { blue, grey } from "@mui/material/colors";

export const useStyles = makeStyles(() => ({
  dialog: {
    borderRadius: "1.2rem",
    padding: "10px",
    minWidth: "10rem",
    maxWidth: "10rem",
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.25rem",
    marginBottom: "0.8rem",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 12px",
    borderBottom: `1px solid ${grey[300]}`,
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
    width: "3.5rem",
    height: "3.5rem", 
  },
  listItemText: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "black",
    marginLeft: "1rem",
  },
  emptyStateText: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: grey[500],
  },
  deleteIcon: {
    fontSize: "1.2rem",
  },

}));
