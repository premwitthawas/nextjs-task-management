import { getCurrent } from "@/features/auth/queries"
import MemberLists from "@/features/workspaces/components/member-lists";
import { redirect } from "next/navigation";

const MembersPage = async() => {
  const user = await getCurrent();
  if(!user) redirect('/sign-in')
  return (
    <div className="w-full lg:max-w-xl">
      <MemberLists />
    </div>
  )
}

export default MembersPage