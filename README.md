<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## Grey Chair Family Kitchen

A cozy, family-run restaurant site (Milford, Ohio vibes) built with **React + Vite**. Includes:

- **Menu** browsing with dietary filters
- **In-session cart** (add/remove, clear)
- **Checkout (pickup)** with customer details + “Place Order” confirmation (front-end only)
- **Kitchen Assistant** chat powered by Gemini (optional)
- **Menu photos** currently display **“Photo coming soon”** placeholders

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:

```bash
npm install
```

2. (Optional) Enable the Kitchen Assistant:

Create `.env.local` and set:

```bash
GEMINI_API_KEY=your_key_here
```

3. Start the dev server:

```bash
npm run dev
```

Vite will print the local URL in the terminal. (The configured default port is `3000`, but Vite may pick another if it’s already in use.)

## Build / preview

```bash
npm run build
npm run preview
```

## Notes

- **Checkout is a demo**: there’s no payment processing and no backend order submission yet.
- The Gemini API key is injected via Vite config so the assistant can read it from `process.env`.
