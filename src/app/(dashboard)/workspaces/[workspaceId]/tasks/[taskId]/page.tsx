import { getCurrent } from "@/features/auth/queries"
import { redirect } from "next/navigation";
import TaskByIdClientPage from "./client";

const TaskByIdPage = async () => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in")
    return (
        <TaskByIdClientPage />
    )
}

export default TaskByIdPage