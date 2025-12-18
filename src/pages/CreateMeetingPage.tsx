import React, { useState } from "react";
import meetingsApi from "../api/meetings";
import { useUsers } from "../hooks/useUsers";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const CreateMeetingPage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Toki Zadgai");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [search, setSearch] = useState("");
  const { users, searchUsers } = useUsers();
  const [participants, setParticipants] = useState<any[]>([]);

  const toggleUser = (u: any) => {
    setParticipants((prev) =>
      prev.find((p) => p._id === u._id)
        ? prev.filter((p) => p._id !== u._id)
        : [...prev, u],
    );
  };

  const submit = async () => {
    await meetingsApi.createMeeting({
      title,
      description,
      location,
      start,
      end,
      participants: participants.map((p) => p._id),
    });

    navigate("/meetings");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Хурал товлох</h1>

        <div className="bg-white rounded-3xl shadow-xl p-5 space-y-4">
          <input
            className="w-full border rounded-xl px-4 py-3 text-sm"
            placeholder="Хуралын нэр"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border rounded-xl px-4 py-3 text-sm"
            placeholder="Тайлбар"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="w-full border rounded-xl px-4 py-3 text-sm"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="datetime-local"
              className="border rounded-xl px-3 py-2 text-sm"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <input
              type="datetime-local"
              className="border rounded-xl px-3 py-2 text-sm"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          <input
            className="w-full border rounded-xl px-4 py-3 text-sm"
            placeholder="хуралд оролцогч хайх..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchUsers(e.target.value);
            }}
          />

          <div className="max-h-40 overflow-y-auto space-y-2">
            {users.map((u) => (
              <button
                key={u._id}
                onClick={() => toggleUser(u)}
                className={`w-full flex justify-between px-3 py-2 rounded-xl text-sm ${
                  participants.find((p) => p._id === u._id)
                    ? "bg-indigo-100"
                    : "bg-slate-50"
                }`}
              >
                <span>{u.name}</span>
                <span className="text-xs text-slate-400">{u.phone}</span>
              </button>
            ))}
          </div>

          <div className="border-t pt-3 text-xs text-slate-500">
            <p className="font-medium">{title}</p>
            <p>
              {start &&
                end &&
                `${dayjs(start).format("MMM D HH:mm")} – ${dayjs(end).format(
                  "HH:mm",
                )}`}
            </p>
            <p>{participants.length} participants</p>
          </div>

          <button
            onClick={submit}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Зөвшөөрөх
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMeetingPage;
