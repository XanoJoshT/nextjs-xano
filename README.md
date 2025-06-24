# Next.js + Xano Boilerplate

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It is a boilerplate for a Next.js app using [Xano](https://xano.com) as a backend, featuring a complete authentication system and API client.

## Features

- **Next.js App Router** - Modern React framework with server components
- **TypeScript** - Type safety throughout the application
- **Xano Integration** - Complete authentication flow and API client
- **Shadcn UI** - Beautiful UI components built with Radix UI and Tailwind CSS
- **Authentication Context** - React context for managing user authentication state
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## Xano Integration

This boilerplate includes a comprehensive Xano integration with the following features:

### Xano Client

The project includes a fully-featured TypeScript client for Xano in `lib/xano.ts`:

- **Authentication** - Login, signup, and logout functionality
- **Token Management** - Automatic token storage and retrieval
- **API Requests** - Type-safe request method for all your Xano API endpoints
- **Error Handling** - Consistent error handling for API requests

### Authentication Flow

The authentication flow is implemented using React Context in `lib/auth-context.tsx`:

- **User State** - Manages the current user state across your application
- **Auth Methods** - Provides login, signup, and logout methods
- **Loading States** - Handles loading states during authentication operations
- **Persistence** - Automatically restores authentication state on page refresh

### Environment Configuration

To connect to your Xano backend:

1. Create a `.env.local` file in the root directory
2. Add your Xano API URL:
   ```
   NEXT_PUBLIC_XANO_API_URL=https://your-xano-api-url.com
   ```

### Required Xano API Endpoints

Your Xano backend should implement these endpoints:

- `/auth/signup` - Register new users
- `/auth/login` - Authenticate existing users
- `/auth/me` - Get current user profile (authenticated)
- `/auth/logout` - Optional endpoint for server-side logout

## Getting Started

First, install dependencies using pnpm:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── components/       # UI components
│   ├── dashboard/        # Protected dashboard route
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page
├── lib/                  # Shared utilities
│   ├── auth-context.tsx  # Authentication context
│   └── xano.ts           # Xano API client
├── public/               # Static assets
└── .env.local            # Environment variables (create this)
```

## Security Best Practices

- **Environment Variables**: Never expose secrets in the browser
- **Auth Guards**: Server-side validation for all sensitive logic
- **API Routes**: Validate all inputs with zod or similar
- **Session Management**: Clear stale sessions on logout

## Learn More

To learn more about Xano, check out:

- [Xano Documentation](https://docs.xano.com/) - learn about Xano's features and API
- [Xano Academy](https://xano.com/academy) - tutorials and guides for building with Xano

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
