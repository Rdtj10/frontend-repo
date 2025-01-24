"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../apis/firebaseApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Logged In:", userCredential.user);

      const token = await userCredential.user.getIdToken();
      Cookies.set("firebaseToken", token, { secure: true, sameSite: "Strict" });

      
      alert("Login Successful!");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="flex flex-col w-full lg:w-1/4 items-center justify-center gap-4 lg:gap-6 p-16 lg:p-0 bg-white"
      component="form"
      autoComplete="off"
      onSubmit={handleLogin}
    >
      <Typography variant="h5">Login</Typography>

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>

      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default LoginForm;
