import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MeetingsPage from "./pages/MeetingsPage";
import NoPermissionPage from "./pages/NoPermissionPage";
import CreateMeetingPage from "./pages/CreateMeetingPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Auth hiih uy bolon entry heseg roo route */}
      <Route path="/" element={<AuthPage />} />

      {/* Home screen page */}
      <Route path="/meetings" element={<MeetingsPage />} />
      <Route path="/create" element={<CreateMeetingPage />} />

      {/* aldaa garah uyd route hiih page */}
      <Route path="/no-permission" element={<NoPermissionPage />} />

      {/* suulihiig ni catch hiih */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
