"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface HomeClientWrapperProps {
  children: React.ReactNode;
}

export default function HomeClientWrapper({
  children,
}: HomeClientWrapperProps) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="p-8">
        <a href="/login" className="text-blue-500">
          Please Login
        </a>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Welcome, {session.user?.name}</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <Link
        href="/posts/create"
        className="text-blue-500 underline mb-6 inline-block"
      >
        Create New Post
      </Link>

      {children}
    </div>
  );
}
