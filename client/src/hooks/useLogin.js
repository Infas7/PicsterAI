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

    const response = await fetch(import.meta.env.VITE_API_URL + "auth/login", {
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
      localStorage.setItem("user", JSON.stringify(jsonData));
      dispatch({ type: "LOGIN", payload: jsonData });
      setIsloading(false);
      navigate("/dashboard");
    }
  };

  return { isLoading, error, setError, login };
};
