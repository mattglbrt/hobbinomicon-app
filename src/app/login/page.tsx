'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => signIn()}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
