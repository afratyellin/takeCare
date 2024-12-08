import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../utils/authUtils";


const Map = () => {
   
      
  const { t } = useTranslation();
  const navigate = useNavigate();
  const mapRef = useRef(null); // ייחוס לדיב של המפה

  useEffect(() => {
    // וודא שה-Google Maps API נטען
    if (window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 32.0853, lng: 34.7818 }, // תל אביב
        zoom: 10,
      });

      // דוגמה להוספת מרקר
      new window.google.maps.Marker({
        position: { lat: 32.0853, lng: 34.7818 },
        map,
        title: "תל אביב",
      });
    } else {
      console.error("Google Maps API failed to load");
    }
  }, []);

  return (
    <div className="flex1">
      <h1>Map</h1>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      ></div>
    </div>
   
  );
};

export default Map;





