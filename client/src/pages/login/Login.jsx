import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { checkLogin } from '../../utils/authUtils';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (checkLogin()) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/Feed');
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };
//to fix!!
  const handleGoogleLogin = () => {
    const googleAuthUrl = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
    window.location.href = googleAuthUrl;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h5" gutterBottom>{t("Login")}</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <TextField
          label={t("Email")}
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={t("password")}
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {t("Login")}
        </Button>
      </form>
      <Typography variant="body1" gutterBottom>
        {t("or")}
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleGoogleLogin}
        fullWidth
      >
        {t("Login with Google")}
      </Button>
      
      
    </Box>
  );
};

export default Login;
