import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Diversity1 } from "@mui/icons-material";
import ImagemLogo from "../../../images/logo-ext-white.png";
import { Button } from "@mui/material";
import { DeleteItemLocalStorage } from "../../../helper/localStorage";
import { useNavigate } from "react-router-dom";
import AppBar from "./appBar";
import DrawerHeader from "./drawerHeader";
import Main from "./main";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children?: JSX.Element;
}

const drawerWidth = 240;

export default function PersistentDrawerLeft(props: Props) {
  const { children } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isOpenShadow, setIsOpenShadow] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    toggleDrawer();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    toggleDrawer();
  };

  const toggleDrawer = () => {
    const newOpenShadow = !!!isOpenShadow;
    setIsOpenShadow(newOpenShadow);
    const newOpenSideBar = !!!open;
    setOpen(newOpenSideBar);
  };

  const navigate = useNavigate();
  //FUNCAO DE LOGOUT
  async function logOut() {
    try {
      console.log("teste entrou");

      await DeleteItemLocalStorage("token");

      navigate("/");
    } catch (error) {
      console.warn(error);
    }
  }
  //FUNCAO DE LOGOUT

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{zIndex: 99}}>
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            height: "9.4vh",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <img
            style={{ width: "12em", ...(open && { display: "none" }) }}
            src={ImagemLogo}
            alt="..."
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          zIndex: 4,
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          style={{
            backgroundColor: "#1976d2",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Toolbar
            style={{
              backgroundImage: `url(${ImagemLogo})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "12.5em",
              margin: "0.5em",
            }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          style={{
            color: "#f2f2f2",
            height: "100%",
            backgroundColor: "#2e2f47",
          }}
        >
          {[
            { texto: "Home", Icon: HomeIcon, route: "/admin/home" },
            {
              texto: "Agendamentos",
              Icon: CalendarMonthIcon,
              route: "/admin/agendamento",
            },
            { texto: "Pacientes", Icon: GroupIcon, route: "/admin/paciente" },
            { texto: "Podólogos", Icon: Diversity1, route: "/admin/podologo" },
            {
              texto: "Perfil",
              Icon: AccountCircleIcon,
              route: "/admin/perfil",
            },
          ].map((item, index) => (
            <ListItem key={item.texto} disablePadding>
              <Link
                onClick={() => toggleDrawer()}
                to={item.route}
                style={{
                  textDecoration: "none",
                  color: "#f2f2f2",
                  width: "100%",
                }}
              >
                <ListItemButton
                  style={{
                    border: "1px solid #f2f2f2",
                    margin: "0.2em",
                    borderRadius: "0.3em",
                  }}
                >
                  <ListItemIcon style={{ color: "#f2f2f2" }}>
                    <item.Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.texto} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
          <Divider sx={{ margin: "1em 0.5em", background: "#FFF" }} />
          <div style={{ display: "flex", justifyContent: "left" }}>
            <Button type="button" onClick={logOut} sx={{ color: "#fff" }}>
              <LogoutIcon sx={{ margin: "0 0.5em" }} /> Log Out
            </Button>
          </div>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Drawer sx={{zIndex: 2}} open={isOpenShadow} onClose={() => {toggleDrawer()}}>
        </Drawer>
          {children}
      </Main>
    </Box>
  );
}
