import { SetupForm } from "../AuthForms";

export const dynamic = "force-dynamic";

export default async function SetupPage({ searchParams }: PageProps<"/admin/setup">) {
  const { token } = await searchParams;
  return (
    <main className="mx-auto max-w-sm px-6 py-20">
      <h1 className="mb-2 text-3xl text-fg">Choose your password</h1>
      {typeof token === "string" ? (
        <>
          <p className="mb-6 text-sm text-fg-muted">This link works once.</p>
          <SetupForm token={token} />
        </>
      ) : (
        <p className="text-sm text-fg-muted">This link is missing its token. Ask for a new one.</p>
      )}
    </main>
  );
}
