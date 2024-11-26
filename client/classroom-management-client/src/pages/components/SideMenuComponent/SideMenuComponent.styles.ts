import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  list_item_style: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: "1.5rem",
  },
  text_style: {
    color: "#000000",
  },
  drawer: {
    width: 144,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 144,
      boxSizing: "border-box",
    },
  },
}));
