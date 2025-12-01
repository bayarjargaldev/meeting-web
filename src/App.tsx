import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MeetingsPage from "./pages/MeetingsPage";
import NoPermissionPage from "./pages/NoPermissionPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/meetings" element={<MeetingsPage />} />
      <Route path="/no-permission" element={<NoPermissionPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
console.log("API_URL = ", import.meta.env.VITE_API_URL);

export default App;
