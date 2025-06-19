---
trigger: always_on
---

You are an expert in TypeScript, Node.js, Next.js App Router, React, Xano, Shadcn UI, Radix UI and Tailwind.

### Project Organization & Architecture

- Use the `app/` directory structure (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`).
- Group files by domain when possible (e.g., `features/auth`, `features/dashboard`).
- Use `lib/` for low-level logic like the Supabase client or third-party utilities.
- Place migrations and edge functions inside the `supabase/` directory.

### Xano Integration

- Use the Xano MCP server whenever appropriate

### Code Style and Structure

- Write concise, technical TypeScript with accurate examples.
- Use comments to help explain technical concepts and functions
- Prefer functional and declarative patterns over classes.
- Avoid code duplication via helper functions and modular components.
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`).
- File structure should follow: exported component → subcomponents → helpers → static → types.

### Naming Conventions

- Use lowercase with dashes for directories (e.g., `components/auth-wizard`).
- Use named exports for components.
- Use interfaces instead of types for object shapes.
- Avoid enums; use plain object maps.

### TypeScript Usage

- All code must be written in TypeScript.
- Prefer interfaces for props and data models.
- Use functional components with clearly typed props.
- Avoid `any`; use `unknown` or explicit types when unsure.

### UI and Styling

- Use Shadcn UI + Radix for components.
- Tailwind CSS for layout, spacing, and utility styles.
- Mobile-first and responsive by default using Tailwind.
- Use `dark:` variants to support dark mode where relevant.

### Performance Optimization

- Minimize use of `'use client'`, `useEffect`, and `setState`.
- Use React Server Components and Server Actions when possible.
- Wrap client components in `<Suspense>` with fallbacks.
- Lazy load non-critical components.
- Optimize images: use WebP, include width/height, lazy-load.

### State Management

- Use `useFormState` and `useFormStatus` with server actions.
- Use `useOptimistic` for lightweight interactive state.
- Avoid global state libraries unless necessary.

### Linting

- Use ESLint, Prettier, and TypeScript strict mode.
- Validate all inputs with `zod`

### Developer Experience (DX)

- `pnpm dev` should start cleanly with no TypeScript errors.
- Document key decisions in `README.md` or `docs/`.

### Accessibility and UX

- Use accessible Radix primitives and Shadcn components.
- Ensure proper `aria-*`, focus handling, and keyboard support.
- Use consistent spacing and typography.

### Security

- Environment Variables: Never expose secrets in the browser. Use `.env.local` for private keys and avoid using them in Client Components.
- Auth Guards: Use server-side validation for all sensitive logic. Never trust client-side checks alone.
- API Routes / Server Actions: Validate all inputs with `zod` or similar. Check session/user IDs before accessing or modifying data.
- Edge Function Secrets: Store secrets in Supabase's function environment variables, not in code.
- Vercel Web Application Firewall (WAF): Enable WAF in Vercel settings to block automated threats.
- Limit Data Exposure: Only return the necessary fields from the database. Avoid exposing sensitive or unnecessary data.
- Session Management: Use Supabase Auth session checks on protected routes. Clear stale sessions on logout.

### Key Conventions

- Optimize Core Web Vitals: LCP, CLS, FID.
- Avoid `'use client'` unless needed for Web APIs.
- Follow official Next.js docs for routing, rendering, and data fetching.