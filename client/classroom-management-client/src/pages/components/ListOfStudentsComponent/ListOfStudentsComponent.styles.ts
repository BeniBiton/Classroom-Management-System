import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    paper: {
        height: 400,
        width: "100%",
    },
    button: {
        borderRadius: "10px",
        padding: "5px 10px",
    },
    tableCellHeader: {
        display: "flex",
        justifyContent: "center",
        verticalAlign: "middle"
    },
    tableCell: {
        display: "flex",
        justifyContent: "center",
        verticalAlign: "middle"
    },
}));
