import { ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuDrawer from "./MenuDrawer";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { title: "Home", route: " " },
  { title: "Books", route: "allBooks" },
  { title: "Add Book", route: "addNewBook" },
];

interface NavigationBarProps {
  children: ReactNode;
}

export default function NavigationBar({ children }: NavigationBarProps) {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleMenuToggle = () => {
    setMobileMenu((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas: "'header''content''footer'",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          gridArea: "header",
          backgroundColor: "var(--main-color)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMenuToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Library
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link to={`/${item?.route}`} className="navigation-element-title">
                {item?.title}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          gridArea: "content",
          paddingTop: 7,
          backgroundColor: "rgb(238, 236, 236)",
        }}
      >
        {children}
      </Box>
      <Drawer
        variant="temporary"
        open={mobileMenu}
        onClose={handleMenuToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <MenuDrawer navItems={navItems} onClick={handleMenuToggle} />
      </Drawer>
      <footer style={{ gridArea: "footer" }}>
        <Typography variant="body2" align="center" color="textSecondary">
          Footer
        </Typography>
      </footer>
    </Box>
  );
}
