import React, { useContext, useState } from "react";
//import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../contexts/authContext';
//import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import { useNavigate } from 'react-router-dom';
import LoginPage from "./login";


export default function SignupPage({ open, onClose }) {

  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registrationError, setRegistrationError] = useState("");


  const register = (event) => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);
    event.preventDefault();

    if (!userName) {
      setRegistrationError("Username is required.");
      return;
    }

    if (!validPassword) {
      setRegistrationError("Password must be at least 8 characters long and contain at least one letter, one number, and one special character.");
      return;
    }

    if (password !== passwordAgain) {
      setRegistrationError("Passwords do not match.");
      return;
    }

    context.register(userName, password);
    onClose();
  };

  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create an account to use all features.
          </DialogContentText>
          {registrationError && (
            <DialogContentText color="error">
              {registrationError}
            </DialogContentText>
          )}
          <form onSubmit={register} id="signup-form">
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              id="passwordAgain"
              label="Password Again"
              type="password"
              fullWidth
              variant="standard"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" form="signup-form">
            Login
          </Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            Already Registered?
            <span onClick={handleLoginOpen}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
              Login!
            </span>
            <LoginPage open={loginOpen} onClose={handleLoginClose} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );

}