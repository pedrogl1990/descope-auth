# Descope Auth Demo

A full-stack authentication demo built with [Descope](https://www.descope.com/) and [Next.js](https://nextjs.org/), showcasing a modern, production-ready auth flow with session management.

## Features

- **Sign Up & Sign In** — Powered by Descope's hosted flow UI
- **Session Management** — Automatic session detection and token handling via `@descope/nextjs-sdk`
- **User Profile** — Display authenticated user's name and email with avatar initials
- **Sign Out** — Secure logout with session invalidation
- **Dark Mode** — Automatic dark/light theme based on system preference
- **Responsive Design** — Mobile-friendly layout

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | React framework (App Router) |
| [Descope](https://www.descope.com/) | SDK 0.15 | Authentication & session management |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Utility-first styling |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Descope account](https://www.descope.com/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/auth-demo.git
cd auth-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_DESCOPE_PROJECT_ID=your_project_id_here
```

You can find your Project ID in the [Descope Console](https://app.descope.com/) under **Project Settings**.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── layout.tsx        # Root layout with AuthProvider and Geist font
├── page.tsx          # Home page — shows user info or sign-in prompt
├── globals.css       # Global styles and CSS design tokens
└── sign-in/
    └── page.tsx      # Sign-in page with Descope Flow widget
```

## How It Works

1. The `AuthProvider` from `@descope/nextjs-sdk` wraps the entire app, managing session state globally.
2. On the home page, `useSession()` detects whether the user has an active session.
3. Authenticated users see their profile (name, email, initials avatar) and a Sign Out button.
4. Unauthenticated users are prompted to navigate to `/sign-in`.
5. The sign-in page renders Descope's `sign-up-or-in` flow, which handles both registration and login.
6. On successful authentication, the user is redirected back to the home page.

## License

MIT
