import Link from "next/link";
import { ArrowRight, Database } from "lucide-react";
import { Button } from "~/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-600">
      <header className="p-4 md:p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">T3 Drive</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-grow items-center justify-center p-4 md:p-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Supercharge Your Data Storage
          </h1>
          <p className="text-xl text-gray-300">
            T3 Drive: The fastest, most secure way to store and access your
            files in the cloud.
          </p>
          <form
            action={async () => {
              "use server";

              const session = await auth();

              if (!session.userId) {
                return redirect("/sign-in");
              }

              return redirect("/drive");
            }}
          >
            <Button
              size={"lg"}
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </main>

      <footer className="p-4 md:p-6">
        <div className="container mx-auto flex flex-col items-center justify-between text-sm text-gray-400 md:flex-row">
          <div className="mb-4 md:mb-0">
            © 2025 T3 Drive. All rights reserved.
          </div>
          <nav className="flex space-x-4">
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="transition-colors duration-200 hover:text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
