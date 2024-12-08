import React, { useState } from "react";
import { Box, Checkbox, FormControl, FormGroup, FormControlLabel, Button, Typography, Slider, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
const Filters = ({ users, setFilteredUsers }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    gender: "",
    professions: [],
    serviceInPerson: false,
    serviceZoom: false,
    hourlyRate: [0, 100], // טווח מחירים ברירת מחדל
    description: ""
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilter({ ...filter, [name]: checked });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSliderChange = (event, newValue) => {
    setFilter({ ...filter, hourlyRate: newValue });
  };

  const applyFilters = () => {
    let filtered = [...users];

    // פילטר מגדר
    if (filter.gender) {
      filtered = filtered.filter(user => user.gender === filter.gender);
    }

    // פילטר מקצועות
    if (filter.professions.length > 0) {
      filtered = filtered.filter(user => filter.professions.some(prof => user.professions.includes(prof)));
    }

    // פילטר שירותים
    if (filter.serviceInPerson) {
      filtered = filtered.filter(user => user.services.inPerson === true);
    }

    if (filter.serviceZoom) {
      filtered = filtered.filter(user => user.services.viaZoom === true);
    }

    // פילטר לפי טווח מחירים
    if (filter.hourlyRate.length === 2) {
      filtered = filtered.filter(user => user.hourlyRate >= filter.hourlyRate[0] && user.hourlyRate <= filter.hourlyRate[1]);
    }

    // פילטר לפי תיאור
    if (filter.description) {
      filtered = filtered.filter(user => user.description.toLowerCase().includes(filter.description.toLowerCase()));
    }

    setFilteredUsers(filtered);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: "24px",
        backgroundColor: "#f5f5f5", // צבע רקע בהיר יותר
        borderRadius: "12px", // פינות מעוגלות יותר
        boxShadow: 4, // צל עדין
        width: "100%",
        maxWidth: "420px",
        margin: "auto"
      }}
    >
      <Typography variant="h6" textAlign={"center"} sx={{ fontWeight: "bold", color: "#333", marginBottom: "16px" }}>
        {t("Filter by")}
      </Typography>

      {/* Gender filter */}
      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 'bold' }}>{t("Gender")}</Typography>
        <FormGroup>
          <FormControlLabel 
            control={<Checkbox checked={filter.gender === "male"} onChange={handleInputChange} name="gender" value="male" />}
            label={t("Male")} 
          />
          
          <FormControlLabel
            control={<Checkbox checked={filter.gender === "female"} onChange={handleInputChange} name="gender" value="female" />}
            label={t("Female")}
          />
        </FormGroup>
      </FormControl>

      {/* Profession filter */}
      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 'bold' }}>Profession</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={filter.professions.includes("fitness trainer")} onChange={handleInputChange} name="professions" value="fitness trainer" />}
            label="Fitness Trainer" 
          />
          <FormControlLabel
            control={<Checkbox checked={filter.professions.includes("yoga")} onChange={handleInputChange} name="professions" value="yoga" />}
            label="Yoga Trainer"
          />
        </FormGroup>
      </FormControl>

      {/* Services filter */}
      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 'bold' }}>Services</Typography>
        <br></br>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={filter.serviceInPerson} onChange={handleCheckboxChange} name="serviceInPerson" />}
            label="In-Person Service"
          />
          <br></br>
          <FormControlLabel
            control={<Checkbox checked={filter.serviceZoom} onChange={handleCheckboxChange} name="serviceZoom" />}
            label="Zoom Service"
          />
          <br></br>
        </FormGroup>
      </FormControl>

      {/* Hourly Rate filter */}
      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 'bold' }}>Hourly Rate</Typography>
        <Slider
          value={filter.hourlyRate}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} $`}
          min={0}
          max={200}
          sx={{ marginBottom: 3 }}
        />
      </FormControl>

      {/* Description filter */}
      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
        <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 'bold' }}>Description</Typography>
        <TextField
          fullWidth
          label="Search in Description"
          variant="outlined"
          value={filter.description}
          onChange={handleInputChange}
          name="description"
          sx={{ marginBottom: 3,padding:3 }}
        />
      </FormControl>

      {/* Apply Filters Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={applyFilters}
        sx={{
          backgroundColor: "#3f51b5", // צבע רקע כפתור
          "&:hover": {
            backgroundColor: "#303f9f", // צבע בעת ריחוף
          },
          padding: "12px",
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "8px", // פינות מעוגלות לכפתור
        }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filters;
