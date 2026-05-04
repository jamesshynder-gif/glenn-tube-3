# Glenn Tube

A real Next.js + PostgreSQL video app with Google sign-in, uploads, comments, likes, and AI helpers.

## Features
- Google OAuth sign-in (NextAuth)
- Real PostgreSQL storage (Prisma)
- Real video uploads via Cloudinary URL/public ID
- Comments and likes persisted in DB
- Feed starts empty (no seed data)
- AI title/description suggestion API (OpenAI)
- Orange/black UI theme with slogan: **the more sus the better**

## Setup
1. `cp .env.example .env` and fill in all keys.
2. `npm install`
3. `npx prisma migrate dev --name init`
4. `npm run dev`

## Required APIs
- Google OAuth credentials
- Cloudinary account/API key/secret
- OpenAI API key
- PostgreSQL database
