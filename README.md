# Glenn Tube

Glenn Tube is a real YouTube-style app using Next.js + PostgreSQL with Google sign-in, email/password accounts, real Cloudinary video uploads, comments, likes, and OpenAI features.

## What is already built
- Orange + black UI and homepage slogan: **the more sus the better**
- Feed starts blank (no fake videos/likes/comments)
- Email/password account creation + login
- Google OAuth login
- Real DB-backed videos, likes, comments
- Real direct-to-Cloudinary video uploads with signed server API
- OpenAI suggestion endpoint

## APIs / credentials you must provide in `.env`
Copy `.env.example` to `.env`.

- `DATABASE_URL` -> PostgreSQL database connection
- `NEXTAUTH_URL` -> app URL (local: `http://localhost:3000`)
- `NEXTAUTH_SECRET` -> random secret string
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` -> from Google Cloud OAuth consent/app credentials
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` -> from Cloudinary dashboard
- `OPENAI_API_KEY` -> from OpenAI API keys dashboard

## Run
1. `npm install`
2. `npx prisma migrate dev --name init`
3. `npm run dev`

## Main routes
- `/` feed
- `/signin` register/sign-in page
- `/upload` real video uploader
- `/videos/:id` watch, like, comment

## Main backend APIs
- `POST /api/auth/register` create email/password account
- `GET/POST /api/auth/[...nextauth]` auth provider callbacks
- `POST /api/uploads/signature` signed Cloudinary upload params
- `POST /api/videos` create video record after upload
- `POST /api/videos/:id/like` like video
- `POST /api/videos/:id/comments` comment
- `POST /api/ai/suggest` OpenAI metadata suggestions
