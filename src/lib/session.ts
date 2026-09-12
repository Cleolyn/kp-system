import { SessionOptions } from "iron-session";

export interface SessionData {
  user?: {
    id: string;
    username: string;
    name: string;
    role: string;
  };
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: "kp-system-secret-key-change-in-production-32chars",
  cookieName: "kp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 8, // 8 hours
  },
};
