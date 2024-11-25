import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    formsContainer: {
        paddingTop: "5rem !important",
        width: "50% !important",
        maxWidth: "50rem !important"
    },
    headline: {
        fontSize: "2.75rem",
        display: "flex",
        justifyContent: "center",
        marginBottom: "0.2rem"
    },
    box: {
        display: "flex",
        justifyContent: "space-around",
        padding: "1.6rem",
        height: "100vh",
        backgroundColor: "#f9f9f9"
    },
}))
