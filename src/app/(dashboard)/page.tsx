import { getCurrent } from "@/features/auth/actions";
import CreateWorkSpaceForm from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await getCurrent();
  if (!user) return redirect("/sign-in");
  return (
    <div className="bg-neutral-500 p-4 h-full">
      <CreateWorkSpaceForm />
    </div>
  );
}
