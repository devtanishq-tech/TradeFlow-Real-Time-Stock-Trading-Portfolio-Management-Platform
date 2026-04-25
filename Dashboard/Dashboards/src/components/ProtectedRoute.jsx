import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const ProtectedRoute = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [loading, setloading] = useState(true);
  const [isloggedin, setisloggedin] = useState(false);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/me`, { withCredentials: true })
      .then(() => {
        setloading(false);
        setisloggedin(true);
      })
      .catch(() => {
        setloading(false);
        setisloggedin(false);
      });
  }, []);
  if (loading) {
    return <p>....Authenticationing is Happening</p>;
  }
  // means if user has not logged in , then back to the login page with a
  // flash message
  if (!isloggedin) {
    return (
      <Navigate
        to={"/login"}
        state={{ message: "You must login to access this page" }}
      />
    );
  }
  return children;
};
export default ProtectedRoute;
