import React from "react";
import { Meeting } from "../types";
import { formatDate, formatTime, formatTimeRange } from "../utils/dateUtils";

interface Props {
  meeting: Meeting;
  onAccept?: () => void;
  onDecline?: () => void;
}

const MeetingCard: React.FC<Props> = ({ meeting, onAccept, onDecline }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex gap-3">
        {/* Accent Bar */}
        <div className="w-1 rounded-full bg-gradient-to-b from-purple-500 to-fuchsia-500" />

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center font-bold text-white text-lg shadow-md">
              {meeting.organizer.name.charAt(0)}
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">
                {meeting.organizer.name}
              </p>
              {meeting.organizer.groups?.[0] && (
                <p className="text-xs text-purple-600 font-medium">
                  {meeting.organizer.groups[0]}
                </p>
              )}
            </div>

            <span
              className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-sm ${
                meeting.status === "confirmed"
                  ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
                  : meeting.status === "pending"
                  ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700"
                  : "bg-gradient-to-r from-rose-100 to-red-100 text-rose-700"
              }`}
            >
              {meeting.status === "confirmed"
                ? "✓ Батлагдсан"
                : meeting.status === "pending"
                ? "⏳ Хүлээгдэж буй"
                : "✗ Цуцлагдсан"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 mb-3 leading-tight">
            {meeting.title}
          </h3>

          {/* Time & Location */}
          <div className="space-y-2 mb-3">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <span className="text-lg">📅</span>
              <span>
                {formatDate(meeting.start)} •{" "}
                {formatTimeRange(meeting.start, meeting.end)}
              </span>
            </p>
            {meeting.location && (
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span className="line-clamp-1">{meeting.location}</span>
              </p>
            )}
          </div>

          {/* Description (if exists) */}
          {meeting.description && (
            <p className="text-sm text-slate-500 mb-3 line-clamp-2">
              {meeting.description}
            </p>
          )}

          {/* Participants */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">👥</span>
            <span className="text-sm text-slate-600">
              {meeting.participants.length + 1} оролцогч
            </span>
            {meeting.participants.length > 0 && (
              <div className="flex -space-x-2 ml-2">
                {meeting.participants.slice(0, 3).map((participant, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow"
                    title={participant.name}
                  >
                    {participant.name.charAt(0)}
                  </div>
                ))}
                {meeting.participants.length > 3 && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow">
                    +{meeting.participants.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Response Status */}
          {meeting.myResponse && meeting.myResponse !== "pending" && (
            <div
              className={`rounded-xl p-3 mb-3 ${
                meeting.myResponse === "accepted"
                  ? "bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200"
                  : "bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  meeting.myResponse === "accepted"
                    ? "text-emerald-700"
                    : "text-rose-700"
                }`}
              >
                {meeting.myResponse === "accepted"
                  ? " Та оролцохоор баталсан"
                  : " Та татгалзсан"}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {meeting.status !== "canceled" &&
            meeting.myResponse === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={onAccept}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Оролцох
                </button>
                <button
                  onClick={onDecline}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Татгалзах
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
