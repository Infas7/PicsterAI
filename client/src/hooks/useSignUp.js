import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    setIsloading(true);
    setError(null);
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const jsonData = await response.json();
    if (!response.ok) {
      setError(jsonData.error);
      setIsloading(false);
    }

    if (response.ok) {
      navigate("/signin");
    }
  };

  return { isLoading, error, setError, signup };
};
