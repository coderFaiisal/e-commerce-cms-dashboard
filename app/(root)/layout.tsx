import { isLoggedIn } from "@/services/auth.service";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = isLoggedIn();

  // if (!admin) {
  //   redirect("/signIn");
  // }

  return <>{children}</>;
}
