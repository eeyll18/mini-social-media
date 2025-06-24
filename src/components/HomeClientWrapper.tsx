"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Navbar from "./common/Navbar";
import LoginPage from "@/app/login/page";

interface HomeClientWrapperProps {
  children: React.ReactNode;
}

export default function HomeClientWrapper({
  children,
}: HomeClientWrapperProps) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <nav className="bg-gradient-to-r to-sky-500 from-sky-600 text-white p-2 shadow-md fixed top-0 left-0 right-0 z-50">
          <div className="container mx-auto flex flex-wrap justify-between items-center">
            <Link href="/" className="text-xl font-bold ">
              MiniSocial
            </Link>
            <Link href="/login" className="hover:text-blue-200">
              Register
            </Link>
          </div>
        </nav>
        <LoginPage />
      </>
    );
  }

  return (
    <div className="">
      <Navbar />

      {/* <Link
        href="/posts/create"
        className="text-blue-500 underline mb-6 inline-block"
      >
        Create New Post
      </Link> */}

      {children}
    </div>
  );
}
