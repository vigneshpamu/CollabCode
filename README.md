# CollabCode

A collaborative cloud code editor with AI-powered code generation, real-time multi-user editing, and integrated terminals — built to feel like a lightweight cloud IDE.

## Features

- **Monaco Code Editor** — Full VS Code-style editing experience with syntax highlighting, multi-file tabs, and keyboard shortcuts
- **Real-Time Collaboration** — Multiple users can edit the same file simultaneously with live cursors and presence avatars, powered by Liveblocks + Yjs (CRDT)
- **Integrated Terminal** — Up to 4 terminal instances per session using xterm.js with full PTY support via Socket.IO
- **AI Code Generation** — Generate code inline with Ctrl+G using Cloudflare Workers AI (Llama 3 8B Instruct), with accept/regenerate/cancel controls
- **File Explorer** — Tree-based sidebar with drag-and-drop, file/folder creation, rename, and delete
- **Live Preview** — Embedded iframe preview for React (Vite) projects with auto-refresh
- **Project Sharing** — Share virtualboxes with other users by email, with owner-managed access control
- **Authentication** — Secure sign-up/sign-in via Clerk with protected routes
- **Rate Limiting** — Memory-based rate limiting on file operations (3 ops/sec, 5MB max file size, 200MB max project size)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| UI Components | Radix UI, shadcn/ui |
| Code Editor | Monaco Editor |
| Terminal | xterm.js, node-pty |
| Real-time Sync | Liveblocks, Yjs, y-monaco |
| Authentication | Clerk |
| Backend Server | Express.js, Socket.IO |
| Database | Cloudflare D1 (SQLite), Drizzle ORM |
| File Storage | Cloudflare R2 |
| AI Generation | Cloudflare Workers AI (Llama 3 8B Instruct) |
| Validation | Zod |
| Containerization | Docker |

## Project Structure

```
CollabCode/
├── frontend/                  # Next.js application
│   ├── app/                   # App Router pages & API routes
│   │   ├── (app)/             # Authenticated routes (dashboard, editor)
│   │   ├── (auth)/            # Sign-in / sign-up pages
│   │   └── api/               # API routes (Liveblocks auth)
│   ├── components/
│   │   ├── dashboard/         # Dashboard UI (project cards, modals)
│   │   ├── editor/            # Code editor (sidebar, terminal, preview, AI)
│   │   └── ui/                # Reusable UI components
│   └── lib/                   # Server actions, types, utilities
│
├── backend/
│   ├── server/                # Express + Socket.IO server
│   │   └── src/               # Terminal management, file ops, rate limiting
│   ├── database/              # Cloudflare Worker — D1 REST API
│   │   └── src/               # Schema, migrations, CRUD endpoints
│   └── storage/               # Cloudflare Worker — R2 REST API
│       └── src/               # File CRUD, project init, starter templates
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A [Clerk](https://clerk.com/) account for authentication
- [Cloudflare Workers](https://workers.cloudflare.com/) account for database and storage
- [Liveblocks](https://liveblocks.io/) account for real-time collaboration

### Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Installation & Running

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Starts the Next.js dev server at `http://localhost:3000`.

**Backend Server:**

```bash
cd backend/server
npm install
npm run dev
```

Starts the Express + Socket.IO server on port 4000.

**Database Worker:**

```bash
cd backend/database
npm install
npm run dev
```

Starts the Cloudflare D1 worker locally via Wrangler.

**Storage Worker:**

```bash
cd backend/storage
npm install
npm run dev
```

Starts the Cloudflare R2 worker locally via Wrangler.

### Docker

Build and run the backend server in a container:

```bash
cd backend/server
docker build -t collabcode-server .
docker run -p 4000:4000 -p 5173:5173 collabcode-server
```

## Usage

1. **Sign up / Sign in** — Create an account or log in via Clerk authentication
2. **Create a Virtualbox** — Choose a React (Vite) or Node.js starter template from the dashboard
3. **Write Code** — Use the Monaco editor with full syntax support, tabs, and keyboard shortcuts (Ctrl+S to save)
4. **Collaborate** — Share your project by email; collaborators edit in real-time with live cursors
5. **Run Code** — Open integrated terminals (up to 4) to run commands; React projects get a live preview
6. **Generate Code** — Toggle Copilot in the sidebar, then press Ctrl+G to generate AI code inline

## Data Model

- **User** — id, name, email, image, AI generation count
- **Virtualbox** — id, name, type (react/node), visibility (public/private), owner
- **UsersToVirtualboxes** — join table for project sharing (userId, virtualboxId)

## License

This project is proprietary and not licensed for public use.
