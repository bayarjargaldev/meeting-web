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
    <div className="p-4 mb-3 rounded-xl bg-white shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-sm font-semibold">{meeting.organizer.name}</p>
          {meeting.organizer.groups?.[0] && (
            <p className="text-xs text-gray-500">
              {meeting.organizer.groups[0]}
            </p>
          )}
        </div>
        <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white capitalize">
          {meeting.status}
        </span>
      </div>

      <h3 className="text-lg font-bold mb-1">{meeting.title}</h3>

      {meeting.description && (
        <p className="text-sm text-gray-600 mb-2">{meeting.description}</p>
      )}

      <p className="text-sm text-gray-700">
        📅 {formatDate(meeting.start)} •{" "}
        {formatTimeRange(meeting.start, meeting.end)}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        {meeting.participants.length + 1} participants
      </p>

      {meeting.myResponse && meeting.myResponse !== "pending" && (
        <p className="mt-2 text-xs text-gray-600">
          You {meeting.myResponse === "accepted" ? "accepted" : "declined"} this
          meeting.
        </p>
      )}

      {meeting.status !== "canceled" && meeting.myResponse === "pending" && (
        <div className="flex gap-3 mt-3">
          <button
            className="flex-1 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="flex-1 py-2 rounded-lg bg-rose-500 text-white text-sm font-semibold"
            onClick={onDecline}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingCard;
