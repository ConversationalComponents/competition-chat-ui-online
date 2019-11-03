import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../images/logo.png";

const useStyles = makeStyles(theme => ({
  header: {
    alignItems: "center",
    backgroundColor: "#01a6e0",
    color: "#fff",
    display: "flex",
    fill: "#fff",
    height: "56px"
  },
  title: {
    fontSize: "17px"
  }
}));

const Header = ({ headerTitle }) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <img src={Logo} height="37" alt="logo" />
    </div>
  );
};

export default Header;
