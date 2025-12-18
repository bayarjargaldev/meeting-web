import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MeetingsPage from "./pages/MeetingsPage";
import NoPermissionPage from "./pages/NoPermissionPage";
import CreateMeetingPage from "./pages/CreateMeetingPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Auth / entry */}
      <Route path="/" element={<AuthPage />} />

      {/* Main app */}
      <Route path="/meetings" element={<MeetingsPage />} />
      <Route path="/create" element={<CreateMeetingPage />} />

      {/* Errors */}
      <Route path="/no-permission" element={<NoPermissionPage />} />

      {/* Catch-all MUST be last */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
