import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/auth-context/AuthContext";
import "./Home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

    // display THIS IS HOME PAGE if user is authenticated, otherwise redirect to login page
    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);
}

export default Home;