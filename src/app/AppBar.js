import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { setCurrentUser } from '../actions/authActions';
import store from '../store';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize:"20px",
    color:"white",
    
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const login=()=>{
   props.login();
  }
  const signup=()=>{
  props.signup();
  }

  const logout=()=>{
    console.log("logout triggred!!");
    store.dispatch(setCurrentUser());
    localStorage.removeItem('auit');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
         {props.loggedIn&& <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>}
          <Typography variant="h6" className={classes.title}>
            {props.heading}
          </Typography>
          {!props.loggedIn&&<><Button color="inherit" variant="contained" className="uk-margin-right" onClick={login}>Login</Button>
          <Button color="secondary" variant="contained" onClick={signup}>Signup</Button></>}
          {props.loggedIn&&<><Avatar  className="uk-margin-right"/>
          <Button color="secondary" variant="contained" onClick={logout}>Logout</Button></>}
        </Toolbar>
      </AppBar>
    </div>
  );
}