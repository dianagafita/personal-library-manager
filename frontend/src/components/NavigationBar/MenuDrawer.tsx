import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface MenuItem {
  title: string;
  route: string;
}

interface MenuDrawerProps {
  navItems: MenuItem[];
  onClick: () => void;
}

export default function MenuDrawer({ navItems, ...props }: MenuDrawerProps) {
  return (
    <Box {...props} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MENU
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link className="mobile-navigation-element-title" to={item.route}>
                <ListItemText primary={item.title} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
