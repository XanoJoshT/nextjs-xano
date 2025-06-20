import Link from 'next/link';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <>
      <SignupForm />
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
          Log in
        </Link>
      </div>
    </>
  );
}
