'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If authentication state is known and user is authenticated, redirect to dashboard
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="flex w-full max-w-3xl flex-col items-center space-y-8 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <Image
            className="dark:drop-shadow-sm"
            src="/xano.svg"
            alt="Xano logo"
            width={170}
            height={38}
            style={{ height: '38px', width: 'auto' }}
            priority
          />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">Next.js + Xano Boilerplate</h1>
        
        <p className="text-xl text-muted-foreground">
          A starter template with Next.js App Router and Xano authentication
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/auth/login">Login</Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-2 font-semibold">Next.js App Router</h2>
            <p className="text-sm text-muted-foreground">Modern, React Server Components-based routing</p>
          </div>
          
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-2 font-semibold">Xano Integration</h2>
            <p className="text-sm text-muted-foreground">Complete authentication flow with Xano backend</p>
          </div>
          
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-2 font-semibold">Shadcn UI</h2>
            <p className="text-sm text-muted-foreground">Beautiful, accessible UI components</p>
          </div>
        </div>
      </main>
    </div>
  );
}
