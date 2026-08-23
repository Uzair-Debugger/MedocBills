import React from "react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin')
    }
    return (
        <>
            {children}
        </>
    )
}

export default layout