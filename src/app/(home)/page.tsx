import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function LandingPage() {
  return (
    <main className="flex flex-grow items-center justify-center p-4 md:p-6">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          Supercharge Your Data Storage
        </h1>
        <p className="text-xl text-gray-300">
          T3 Drive: The fastest, most secure way to store and access your files
          in the cloud.
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
  );
}
