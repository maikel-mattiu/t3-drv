import { SignInButton } from "@clerk/nextjs";

export default function LandingPage() {
  return <SignInButton forceRedirectUrl={"/drive"} />;
}
