import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import WriterHeader from "./_components/WriterHeader";
import WriterSidebar from "./_components/WriterSidebar";

export default function WriterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-50">
        <WriterHeader />
        <div className="flex">
          <WriterSidebar />
          <main className="flex-1 p-6">
            {" "}
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
            {children}
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    </ClerkProvider>
  );
}
