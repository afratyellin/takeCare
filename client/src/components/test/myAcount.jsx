import React from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { pink } from '@mui/material/colors';
import "./myAcount.css"; // ייבוא קובץ העיצוב
import { useState } from "react";
const CreateAccountForm = () => {
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [city, setCity] = useState([]);
    const [streetName, setStreetName] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedStreet, setSelectedStreet] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const months = [
        { value: 1, label: 'ינואר' },
        { value: 2, label: 'פברואר' },
        { value: 3, label: 'מרץ' },
        { value: 4, label: 'אפריל' },
        { value: 5, label: 'מאי' },
        { value: 6, label: 'יוני' },
        { value: 7, label: 'יוני' },
        { value: 8, label: 'אוגוסט' },
        { value: 9, label: 'ספטמבר' },
        { value: 10, label: 'אוקטובר' },
        { value: 11, label: 'נובמבר' },
        { value: 12, label: 'דצמבר' },
    ];

    const validateName = (name) => {
        return name.trim().length > 0; // ודא שהשם אינו ריק
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^(?:(?:\+|00)972?)?0?([23489]\d{7})$/;
        return phoneRegex.test(phone); // ודא שהטלפון תקין
    };

    const validateDate = (day, month, year) => {
        return day > 0 && day <= 31 && month > 0 && month <= 12 && year > 0; // ודא שהתאריך תקין
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (validateName(value)) {
            console.log('שם תקין');
        } else {
            console.log('שם אינו תקין');
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        if (validatePhoneNumber(value)) {
            console.log('מספר הטלפון תקין');
        } else {
            console.log('מספר הטלפון נייד אינו תקין');
        }
    };

    const handleDateChange = () => {
        if (validateDate(day, month, year)) {
            console.log('תאריך תקין');
        } else {
            console.log('תאריך אינו תקין');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Box className="form-container">
            <Typography variant="h5" gutterBottom>
                יצירת חשבון
            </Typography>
            <Box className="form-content">
                <Typography variant="subtitle1" gutterBottom>
                    פרטים אישיים
                </Typography>
                <div className="fullName">
                    <TextField
                        label="שם פרטי"
                        variant="outlined"
                        className="form-input"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                            handleNameChange();
                        }}
                       
                    />
                    <p className="space"></p>
                    <TextField
                        label="שם משפחה"
                        variant="outlined"
                        className="form-input"
                        onChange={(e) => {
                            setLastName(e.target.value);
                            handleNameChange();
                        }}
                    />
                </div>
                <Box className="form-row">
                    <TextField
                        label="יום"
                        type="number"
                        variant="outlined"
                        className="form-small-input"
                        onChange={(e) => {
                            setDay(e.target.value);
                            handleDateChange();
                        }}
                    />
                    <FormControl className="form-small-input">
                        <InputLabel>חודש</InputLabel>
                        <Select
                        label="חודש"
                            onChange={(e) => {
                                setMonth(e.target.value);
                                handleDateChange();
                            }}
                        >
                            {months.map((month) => (
                                <MenuItem key={month.value} value={month.value}>
                                    {month.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="שנה"
                        type="number"
                        variant="outlined"
                        className="form-small-input"
                        onChange={(e) => {
                            setYear(e.target.value);
                            handleDateChange();
                        }}
                    />
                </Box>
                <FormControl fullWidth className="form-input">
                    <InputLabel>מגדר</InputLabel>
                    <Select
                        label="מגדר"
                        className="pink-border">
                        <MenuItem value="נקבה">נקבה</MenuItem>
                        <MenuItem value="זכר">זכר</MenuItem>
                        <MenuItem value="לא רוצה לציין">לא רוצה לציין</MenuItem>
                        <MenuItem value="אחר">אחר</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth className="form-input">
                    <InputLabel>עיר</InputLabel>
                    <Select
                        label="עיר"
                        onChange={(e) => setSelectedCity(e.target.value)}
                        >
                        {city.map((cityName, index) => (
                            <MenuItem key={index} value={cityName}>{cityName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box className="form-row">
                    <FormControl className="form-input">
                        <InputLabel>רחוב</InputLabel>
                        <Select
                            label="רחוב"
                            className="street"
                            onChange={(e) => setSelectedStreet(e.target.value)}
                        >
                            {streetName.map((streetName, index) => (
                                <MenuItem key={index} value={streetName}>{streetName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <p className="space"></p>
                    <TextField
                        label="מספר"
                        type="number"
                        variant="outlined"
                        className="form-input"
                    />
                </Box>
                <TextField
                    fullWidth
                    label="טלפון נייד"
                    type="tel"
                    variant="outlined"
                    className="form-input"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                />
                <FormControlLabel
                    control={<Checkbox defaultChecked sx={{ color: pink[400], '&.Mui-checked': { color: pink[300] } }} />}
                    label="ברצוני להצטרף גם למטפל,ת."
                    className="form-checkbox"
                />

                <Button onClick={handleSubmit} className="creatTheAcount" fullWidth variant="contained">
                    יצירת חשבון
                </Button>
            </Box>
        </Box>
    );
};

export default CreateAccountForm;
