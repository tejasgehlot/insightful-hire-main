# Backend (authentication)

This folder contains a small Express.js backend implementing authentication with MongoDB.

Endpoints (mounted at `/api/auth`):

- `POST /signup` - body: `{ email, password, name, role }` -> returns `{ accessToken, refreshToken, user }`
- `POST /login` - body: `{ email, password }` -> returns `{ accessToken, refreshToken, user }`
- `POST /logout` - body: `{ refreshToken }` (optional) -> removes refresh token server-side
- `POST /refresh` - body: `{ refreshToken }` -> returns `{ accessToken }`
- `GET /me` - header: `Authorization: Bearer <accessToken>` -> returns user info

To run locally without Docker:

1. Copy `.env.example` to `.env` and adjust values.
2. Run `npm install` inside `backend`.
3. Start MongoDB and then run `npm start`.
