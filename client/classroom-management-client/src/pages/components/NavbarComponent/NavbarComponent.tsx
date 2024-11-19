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
  const navberStyles = useStyles();
  const { toggleTheme } = useThemeContext()

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Menu button that triggers the sidebar to open */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick} // Calls the function passed as a prop to open the sidebar
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div">
          Shob Classes
        </Typography>
        <LoyaltyIcon
          className={navberStyles.loyalty_icon_style}
          sx={{ fontSize: "1.2rem" }}
          onClick={toggleTheme}
        />
      </Toolbar>
    </AppBar>
  );
};
export default Navbar
