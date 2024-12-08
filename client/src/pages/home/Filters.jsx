import React, { useState, useEffect } from "react";
import { Checkbox, FormControl, FormControlLabel, InputLabel, Select, MenuItem, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Users from "./Users"; // ייבוא קומפוננטת Users

const Filters = () => {
  const [users, setUsers] = useState([]); // שמירה על כל המשתמשים
  const [filteredUsers, setFilteredUsers] = useState([]); // שמירה על המשתמשים המסוננים
  const [loading, setLoading] = useState(true); // מצב טעינה
  const [error, setError] = useState(""); // מצב שגיאה

  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [maxHourlyRate, setMaxHourlyRate] = useState(100); // לדוגמה, גובה מחיר מקסימלי
  const [gender, setGender] = useState("");
  const [inPerson, setInPerson] = useState(false);
  const [viaZoom, setViaZoom] = useState(false);

  // טעינת הנתונים מה-API
  useEffect(() => {
    fetch("http://localhost:2000/api/users/allprofessional")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data); // שמירה על כל המשתמשים
        setFilteredUsers(data); // שמירה על המשתמשים המסוננים (בהתחלה כל הנתונים)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  // פונקציה שמבצעת את הסינון
  const applyFilters = () => {
    if (users && users.length > 0) {
      const filtered = users.filter((user) => {
        const matchesProfessions =
          selectedProfessions.length === 0 ||
          selectedProfessions.every((profession) => user.professions.includes(profession));

        const matchesHourlyRate = user.hourlyRate <= maxHourlyRate;
        const matchesGender = !gender || user.gender === gender;
        const matchesInPerson = !inPerson || user.services.inPerson;
        const matchesViaZoom = !viaZoom || user.services.viaZoom;

        return matchesProfessions && matchesHourlyRate && matchesGender && (matchesInPerson || matchesViaZoom);
      });

      setFilteredUsers(filtered); // עדכון המשתמשים המסוננים
    }
  };

  // אם יש טעינה או שגיאה
  if (loading) return <Typography>Loading users...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="flex">
      <div className="flex1" >
      <FormControl fullWidth>
        <InputLabel>Professions</InputLabel>
        <Select
          multiple
          value={selectedProfessions}
          onChange={(e) => setSelectedProfessions(e.target.value)}
          label="Professions"
        >
          <MenuItem value="fitness trainer">Fitness Trainer</MenuItem>
          <MenuItem value="yoga">Yoga</MenuItem>
          <MenuItem value="NLP">NLP</MenuItem>
          {/* הוסף מקצועות נוספים */}
        </Select>
      </FormControl>

      <TextField
        label="Max Hourly Rate"
        type="number"
        value={maxHourlyRate}
        onChange={(e) => setMaxHourlyRate(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select value={gender} onChange={(e) => setGender(e.target.value)} label="Gender">
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={<Checkbox checked={inPerson} onChange={() => setInPerson(!inPerson)} />}
        label="In Person"
      />
      <FormControlLabel
        control={<Checkbox checked={viaZoom} onChange={() => setViaZoom(!viaZoom)} />}
        label="Via Zoom"
      />

      <Button variant="contained" color="primary" onClick={applyFilters}>
        Apply Filters
      </Button>
      </div>

      {/* הצגת המשתמשים המסוננים */}
      <Users filteredUsers={filteredUsers} />
    </Box>
  );
};

export default Filters;
