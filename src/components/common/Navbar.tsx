"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <nav className="bg-gradient-to-r to-sky-500 from-sky-600 text-white p-3 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <Link href="/" className="text-xl font-bold ">
            MiniSocial
          </Link>
          <Link href="/login" className="hover:text-blue-200">
            Sign in
          </Link>
        </div>
      </nav>
    );
  }
  const userId = session.user?.name; 

  return (
    <nav className="bg-gradient-to-r to-sky-500 from-sky-600 text-white p-3 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="text-xl font-bold ">
          MiniSocial
        </Link>
        <Link href={`/profile/${userId}`} className="text-xl">Welcome, {session.user?.name}</Link>
        <button
          onClick={() => signOut()}
          className="cursor-pointer hover:bg-white hover:text-sky-600 duration-200 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
