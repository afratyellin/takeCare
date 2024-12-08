import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../utils/authUtils";
import Map from "../home/Map"
import Users from "../home/Users"
import Filters from "../home/Filters"
const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex">

   <Filters></Filters>
   <Map className="Map"></Map>
   </div>
  );
};

export default Home;
