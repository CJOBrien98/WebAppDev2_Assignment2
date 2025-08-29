import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../contexts/authContext';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import SignupPage from "./signup";


export default function LoginPage({ open, onClose }) {

  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    context.authenticate(userName, password);
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };
    navigate(from, { replace: true });
    onClose();
  };

  const [signupOpen, setSignupOpen] = useState(false);

  const handleSignupOpen = () => {
    setSignupOpen(true);
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
  };


  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter username and password to login.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="login-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              onChange={e => setUserName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={e => setPassword(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" form="login-form">
            Login
          </Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            Not Registered?
            <span onClick={handleSignupOpen}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
              Sign Up!
            </span>
            <SignupPage open={signupOpen} onClose={handleSignupClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );

}