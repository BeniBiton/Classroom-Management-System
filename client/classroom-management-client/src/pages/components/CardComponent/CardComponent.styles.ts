import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  delete_icon: {
    background: "#3f50b5",
    color: "#3f50b5",
  },
  card_style: {
    width: "200px",
    minHeight: "150px",
    margin: "1rem 0.5rem", 
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", 
  },
  title: {
    fontWeight: "bold !important"
    
  },
  contant: {
    paddingTop: "0.8rem"
  },
  cardActions: {
    justifyContent: "space-between"
  },
  button: {
    color: "#000000 !important"
  }
}));
