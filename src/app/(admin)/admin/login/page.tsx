import { redirect } from "next/navigation";
import { getAdminActor } from "@/lib/admin/session";
import { LoginForm } from "../AuthForms";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getAdminActor()) redirect("/admin/blog-reviews");
  return (
    <main className="mx-auto max-w-sm px-6 py-20">
      <h1 className="mb-6 text-3xl text-fg">Juris CFO admin</h1>
      <LoginForm />
    </main>
  );
}
