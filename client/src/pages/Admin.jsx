import React, { useEffect, useState } from "react";
import { checkLogin, getLoggedInUser } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getLoggedInUser());
    // If no token is found, redirect to the login page
    if (!checkLogin()) {
      navigate("/login");
      return;
    }
    if (user) {
      // Check if the user has the correct role (admin in this case)
      if (user.role !== "admin") {
        // Redirect to a forbidden page or another page for non-admin users
        setError("Access denied. You do not have the right permissions.");
        navigate("/");
      }
    }
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, Admin</h1>
      {/*  admin content goes here */}
    </div>
  );
};

export default AdminPage;
