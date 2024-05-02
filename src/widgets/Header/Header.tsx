import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </Toolbar>
  </AppBar>
);
