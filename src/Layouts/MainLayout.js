import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { chocolateContext } from "../context/ChocolateContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textDecoration: "none",
    // webkitPerspective: "1500px",
    // perspective: "1500px",
    // webkitTransform: "translate3d(0, 0, -300px)",
    // transform: "translate3d(0, 0, -300px)",
    // webkitTransformStyle: "preserve-3d",
    // transformStyle: "preserve-3d",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    backgroundImage:
      "linear-gradient(-225deg, #ff3cac 0%, #562b7c 52%, #2b86c5 100%)",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

    // webkitTransition: "-webkit-transform 0.5s",
    // transition: "transform 0.5s",
    // webkitTransform: "translate3d(0, 0, 0)",
    // transform: "translate3d(0, 0, 0)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,

    backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    minHeight: "100vh",
    position: "relative",

    webkitTransform: "translate3d(0, 0, -300px)",
    transform: "translate3d(0, 0, -300px)",
  },
  addBtn: {
    position: "fixed",
    top: "50%",
    right: 15,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  brandLogo: {
    width: 80,
    objectFit: "contain",
  },
}));

export default function MainLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { brands, fetchBrands } = useContext(chocolateContext);

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.navContent}>
            <NavLink
              className={classes.logo}
              style={{ textDecoration: "none", color: "#fff" }}
              to="/"
            >
              <Typography variant="h6" noWrap>
                ChocoShop
              </Typography>
            </NavLink>

            <SearchBar />
          </div>
          <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </Link>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <IconButton color="inherit">
              <AccountBoxIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {brands.map((brand) => (
            <Link to={`/brand/${brand.id}`} style={{ textDecoration: "none" }}>
              <ListItem button key={brand.id}>
                <ListItemText primary={brand.title} />
                <ListItemIcon>
                  <img
                    className={classes.brandLogo}
                    src={brand.logo}
                    alt={`${brand.title} logo`}
                  />
                </ListItemIcon>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div style={{ height: 64 }}></div>
        {props.children}
        <Fab
          onClick={() => history.push("/products/create")}
          className={classes.addBtn}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </main>
    </div>
  );
}
