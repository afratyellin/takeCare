import { jwtDecode } from "jwt-decode";

export const checkLogin = () => {
  const token = localStorage.getItem("token");
  // Return false if no token exists
  if (!token) {
    return false;
  }
  return true;
};

export const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  // Return null if no token exists
  if (!token) {
    return null;
  }
  try {
    // Decode and return user data from token
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
