import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useStyles } from "./NavbarComponent.styles";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { NavbarProps } from "../../../interfaces/class.interface";
import { useThemeContext } from "../../../themes/ThemeContext";



const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const classes = useStyles();
  const { toggleTheme } = useThemeContext()

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          className={classes.iconButton}
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div">
          Shob Classes
        </Typography>
        <LoyaltyIcon
          className={classes.loyalty_icon_style}

          onClick={toggleTheme}
        />
      </Toolbar>
    </AppBar>
  );
};
export default Navbar
