# PMP Affiliate Partner Program (Next.js + Node)

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

- Frontend: React (Next.js App Router), pages: / , /join, /seats, /dashboard
- Backend: Next.js API routes (Node runtime) in app/api
- Data: in-memory store (lib/db.js) - resets on server restart. Swap lib/db.js for MongoDB/Postgres for production.
- KYC and OTP are demo only (any 4 digits). Add a real SMS/KYC provider before going live.
