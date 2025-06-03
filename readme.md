# Hobbinomicon

A hobby tracking application built with Next.js and Tailwind CSS.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set the following environment variables in a `.env.local` file:

```bash
# Baserow API access
NEXT_PUBLIC_BASEROW_BASE_URL=<your-baserow-url>
NEXT_PUBLIC_BASEROW_API_TOKEN=<your-api-token>

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
GITHUB_CLIENT_ID=<github-client-id>
GITHUB_CLIENT_SECRET=<github-client-secret>
```

3. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application. You can sign in using GitHub and manage your miniature collection once authenticated.
