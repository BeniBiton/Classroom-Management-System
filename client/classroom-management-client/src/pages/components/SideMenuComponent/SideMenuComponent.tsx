import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { useStyles } from "./SideMenuComponent.styles";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <>
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Drawer
        sx={{
          width: 144,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 144,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List>
          {["Classes", "Students", "Create"].map((text) => (
            <ListItem key={text} disablePadding className={classes.list_item_style}>
              <Link
                to={text === "Classes" ? `/` : `/${text.toLowerCase()}`}
                style={{ textDecoration: "none" }}
              >
                <ListItemButton>
                  <ListItemText primary={text} className={classes.text_style}/>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
