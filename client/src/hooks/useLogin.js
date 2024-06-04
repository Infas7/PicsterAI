import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsloading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const jsonData = await response.json();

    if (!response.ok) {
      setIsloading(false);
      setError(jsonData.error);
    }

    if (response.ok) {
      setIsloading(false);
      localStorage.setItem("user", JSON.stringify(jsonData));
      dispatch({ type: "LOGIN", payload: jsonData });
      navigate("/dashboard");
    }
  };

  return { isLoading, error, setError, login };
};
