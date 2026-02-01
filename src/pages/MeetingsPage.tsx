import React, { useMemo, useState } from "react";
import {
  useMeetings,
  useMeetingHistory,
  useRespondToMeeting,
} from "../hooks/useMeetings";
import MeetingCard from "../components/MeetingCard";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

type ViewMode = "calendar" | "list";

// ✅ FIX: Use local date strings instead of ISO (UTC) strings
const getDateKey = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

const buildMonthGrid = (currentMonth: Date) => {
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const startWeekDay = (start.getDay() + 6) % 7;

  const days: Date[] = [];
  for (let i = 0; i < startWeekDay; i++) days.push(new Date(NaN));
  for (let d = 1; d <= end.getDate(); d++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
  }
  return days;
};

const MeetingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");

  const upcoming = useMeetings();
  const past = useMeetingHistory();
  const respond = useRespondToMeeting();

  const current = tab === "upcoming" ? upcoming : past;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthDays = buildMonthGrid(currentMonth);

  const meetings = current.data || [];

  const meetingsByDay = useMemo(() => {
    const map: Record<string, any[]> = {};
    meetings.forEach((m) => {
      // ✅ FIX: Convert UTC time to local date for grouping
      const localDate = new Date(m.start);
      const key = getDateKey(localDate);
      if (!map[key]) map[key] = [];
      map[key].push(m);
    });
    return map;
  }, [meetings]);

  const selectedKey = getDateKey(selectedDate);
  const meetingsForSelectedDay = meetingsByDay[selectedKey] || [];
  const today = getDateKey(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-6">
      <div className="max-w-md mx-auto relative">
        {/* HEADER */}
        <header className="mb-6">
          <p className="text-xs text-indigo-500 font-medium">Токи задгай</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Миний Хуралууд
          </h1>
          {user && (
            <p className="text-xs text-slate-400 mt-1">Сайнуу {user.name}</p>
          )}
        </header>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* TABS */}
          <div className="p-4 flex items-center justify-between">
            <div className="bg-slate-100 p-1 rounded-full flex">
              {["upcoming", "past"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t as any)}
                  className={`px-4 py-1.5 text-xs rounded-full transition ${
                    tab === t
                      ? "bg-white shadow text-indigo-600"
                      : "text-slate-500"
                  }`}
                >
                  {t === "upcoming" ? "Өдөр сонгох" : "Дууссан"}
                </button>
              ))}
            </div>

            <div className="bg-slate-100 p-1 rounded-full flex">
              {["Календар", "Жагсаалт"].map((v) => (
                <button
                  key={v}
                  onClick={() => setViewMode(v as ViewMode)}
                  className={`px-3 py-1.5 text-xs rounded-full ${
                    viewMode === v
                      ? "bg-white shadow text-indigo-600"
                      : "text-slate-500"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* MONTH NAV */}
          {viewMode === "calendar" && (
            <div className="flex items-center justify-between px-6 pb-2">
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1,
                    ),
                  )
                }
                className="h-8 w-8 rounded-full bg-slate-100 text-slate-600"
              >
                ‹
              </button>

              <p className="text-sm font-semibold">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                    ),
                  )
                }
                className="h-8 w-8 rounded-full bg-slate-100 text-slate-600"
              >
                ›
              </button>
            </div>
          )}

          {/* CONTENT */}
          <div className="px-4 pb-6 max-h-[65vh] overflow-y-auto">
            {current.isLoading && (
              <p className="text-center text-slate-400 py-10">
                идвэхитэй хурал шалгаж байна…
              </p>
            )}

            {/* LIST */}
            {!current.isLoading && viewMode === "list" && (
              <>
                {meetings.length === 0 ? (
                  <p className="text-center text-slate-400 py-12">
                    Одоогоор хурал байхгүй байна.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {meetings.map((m) => (
                      <MeetingCard
                        key={m._id}
                        meeting={m}
                        onAccept={() =>
                          respond.mutate({
                            meetingId: m._id,
                            response: "accepted",
                          })
                        }
                        onDecline={() =>
                          respond.mutate({
                            meetingId: m._id,
                            response: "rejected",
                          })
                        }
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* CALENDAR */}
            {!current.isLoading && viewMode === "calendar" && (
              <>
                <div className="grid grid-cols-7 text-[11px] text-center text-slate-400 mb-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (d) => (
                      <span key={d}>{d}</span>
                    ),
                  )}
                </div>

                <div className="grid grid-cols-7 gap-1 mb-6">
                  {monthDays.map((d, i) => {
                    if (isNaN(d.getTime())) return <div key={i} />;
                    const key = getDateKey(d);
                    const hasMeetings = !!meetingsByDay[key];
                    const isToday = key === today;

                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(d)}
                        className={`aspect-square rounded-xl text-xs flex flex-col items-center justify-center relative ${
                          key === selectedKey
                            ? "bg-indigo-600 text-white"
                            : isToday
                              ? "bg-indigo-50 text-indigo-700 font-semibold"
                              : "bg-slate-50"
                        }`}
                      >
                        <span>{d.getDate()}</span>
                        {hasMeetings && (
                          <span
                            className={`mt-1 h-1.5 w-1.5 rounded-full ${
                              key === selectedKey ? "bg-white" : "bg-indigo-400"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <h3 className="text-xs font-semibold text-slate-600 mb-3">
                  Хуралууд{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </h3>

                {meetingsForSelectedDay.length === 0 ? (
                  <p className="text-slate-400 text-sm">
                    Танд товологдсон хурал байхгүй байна.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {meetingsForSelectedDay.map((m) => (
                      <MeetingCard
                        key={m._id}
                        meeting={m}
                        onAccept={() =>
                          respond.mutate({
                            meetingId: m._id,
                            response: "accepted",
                          })
                        }
                        onDecline={() =>
                          respond.mutate({
                            meetingId: m._id,
                            response: "rejected",
                          })
                        }
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* FLOATING CREATE BUTTON */}
        <button
          onClick={() => navigate("/create")}
          className="fixed bottom-6 right-7 h-14 w-14 rounded-full bg-indigo-600 text-white text-3xl shadow-xl active:scale-90"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MeetingsPage;
