// User Types
export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  groups: string[];
  isTokiEmployee: boolean;
  profilePicUrl?: string;
  accountId?: string;
}

// Meeting Types
export interface Meeting {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  organizer: User;
  participants: User[];
  start: string; // ISO date string
  end: string; // ISO date string
  status: "pending" | "confirmed" | "canceled";
  responses?: Record<string, "accepted" | "rejected" | "pending">;
  myResponse?: "accepted" | "rejected" | "pending";
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface AuthResponse {
  ok: boolean;
  token?: string;
  user?: User;
  reason?: string;
  message?: string;
}

// API Response Types
export interface MeetingsResponse {
  meetings: Meeting[];
}

export interface UsersResponse {
  users: User[];
}

export interface GroupsResponse {
  groups: string[];
}

export interface CalendarResponse {
  date: string;
  view: string;
  meetings: Meeting[];
}

export interface AvailabilitySlot {
  start: string;
  end: string;
  available: boolean;
  meeting?: Meeting;
}

export interface AvailabilityResponse {
  slots: AvailabilitySlot[];
}

export interface ConflictCheck {
  available: boolean;
  conflicts: Array<{
    user: User;
    meeting: Meeting;
  }>;
}

// Forms
export interface CreateMeetingForm {
  title: string;
  description?: string;
  location?: string;
  participants: string[];
  start: Date;
  end: Date;
}
