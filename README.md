# MeetSphere

A lightweight Zoom-style meeting platform: landing page + user dashboard with meeting scheduling, a meeting room UI, and in-meeting chat. Built with React 18, React Router, Tailwind CSS v4, and lucide-react icons.

## Scope (by design)

- ✅ Landing page (hero, features, pricing, testimonials, FAQ)
- ✅ Auth (mock, localStorage-based — login/register/forgot password)
- ✅ Dashboard home (live clock, quick actions, today's meetings)
- ✅ Schedule / start / delete meetings
- ✅ Meeting room (mock video tiles, mute/camera/share toggle, leave)
- ✅ In-meeting chat panel
- ✅ Dark / light theme toggle, green brand palette throughout
- ❌ No calendar integration, no notes — intentionally left out

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build in `dist/`.

## Folder structure

```
src/
  components/
    common/      Button, Avatar, SectionHeading, ThemeToggle
    meeting/      ScheduleModal, ChatPanel, MeetingControls, ParticipantTile
    errors/       NotFound, Unauthorized
  context/        ThemeContext, AuthContext, MeetingsContext
  data/           mock meeting data
  layouts/        PubLayout, AuthLayout, DashboardLayout
  pages/
    pub/          landing page + sections
    auth/         Login, Register, ForgotPassword
    dashboard/    DashboardHome, MeetingsList, MeetingRoom, Settings
  routes/         ProtectedRoute
  App.jsx         all route wiring
  main.jsx        provider setup
```

## Notes

- Auth and meetings are mocked in-memory / localStorage — swap in a real API by editing `context/AuthContext.jsx` and `context/MeetingsContext.jsx`.
- Theme persists via `localStorage` and toggles a `.theme-light` class on `<html>`; all colors are CSS variables defined in `src/index.css`, so it's easy to re-theme.
