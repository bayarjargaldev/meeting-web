import React from "react";
import { Meeting } from "../types";
import { formatDate, formatTimeRange } from "../utils/dateUtils";

interface Props {
  meeting: Meeting;
  onAccept?: () => void;
  onDecline?: () => void;
}

const MeetingCard: React.FC<Props> = ({ meeting, onAccept, onDecline }) => {
  return (
    <div className="flex gap-3 bg-white rounded-2xl p-4 shadow-md border border-slate-100">
      {/* Accent bar */}
      <div className="w-1 rounded-full bg-indigo-500" />

      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
            {meeting.organizer.name.charAt(0)}
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold">{meeting.organizer.name}</p>
            {meeting.organizer.groups?.[0] && (
              <p className="text-xs text-slate-400">
                {meeting.organizer.groups[0]}
              </p>
            )}
          </div>

          <span
            className={`text-[10px] px-2 py-1 rounded-full capitalize ${
              meeting.status === "confirmed"
                ? "bg-emerald-100 text-emerald-700"
                : meeting.status === "pending"
                ? "bg-amber-100 text-amber-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {meeting.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold mt-3">{meeting.title}</h3>

        {/* Time */}
        <p className="text-xs text-slate-500 mt-1">
          {formatDate(meeting.start)} •{" "}
          {formatTimeRange(meeting.start, meeting.end)}
        </p>

        {/* Participants */}
        <p className="text-xs text-slate-400 mt-1">
          {meeting.participants.length + 1} participants
        </p>

        {/* Response */}
        {meeting.myResponse && meeting.myResponse !== "pending" && (
          <p className="text-xs mt-2 text-slate-500">
            You{" "}
            <span className="font-medium">
              {meeting.myResponse === "accepted" ? "are going" : "declined"}
            </span>
          </p>
        )}

        {/* Actions */}
        {meeting.status !== "canceled" && meeting.myResponse === "pending" && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={onAccept}
              className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              Going
            </button>
            <button
              onClick={onDecline}
              className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
