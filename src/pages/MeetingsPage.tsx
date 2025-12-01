import React, { useState } from "react";
import {
  useMeetings,
  useMeetingHistory,
  useRespondToMeeting,
} from "../hooks/useMeetings";
import MeetingCard from "../components/MeetingCard";
import { useAuthStore } from "../store/authStore";

const MeetingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const upcoming = useMeetings();
  const past = useMeetingHistory();
  const respond = useRespondToMeeting();

  const current = tab === "upcoming" ? upcoming : past;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Meetings</h1>
          {user && (
            <p className="text-xs text-gray-500">Logged in as {user.name}</p>
          )}
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 text-sm font-semibold border-b-2 ${
            tab === "upcoming"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`flex-1 py-3 text-sm font-semibold border-b-2 ${
            tab === "past"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("past")}
        >
          Past
        </button>
      </div>

      <main className="max-w-xl mx-auto px-4 py-4">
        {current.isLoading ? (
          <p className="text-center text-gray-500 mt-8">Loading meetings…</p>
        ) : current.data && current.data.length > 0 ? (
          current.data.map((m) => (
            <MeetingCard
              key={m._id}
              meeting={m}
              onAccept={() =>
                respond.mutate({ meetingId: m._id, response: "accepted" })
              }
              onDecline={() =>
                respond.mutate({ meetingId: m._id, response: "rejected" })
              }
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">
            {tab === "upcoming" ? "No upcoming meetings." : "No past meetings."}
          </p>
        )}
      </main>
    </div>
  );
};

export default MeetingsPage;
