import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { checkLogin, getLoggedInUser } from "../utils/authUtils";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        {t("welcome")}
      </Typography>
      {checkLogin() ? (
        ""
      ) : (
        <Box display="flex"
        flexDirection="column">
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            style={{ margin: "10px 0" }}
          >
            {t("Login")}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/register")}>
            {t("register")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
