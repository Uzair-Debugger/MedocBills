import React from "react"
import { getCurrentAdmin } from "@/src/lib/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
    const admin = await getCurrentAdmin();

    if (!admin) {
        redirect('/api/auth/signin')
    }
    return (
        <>
            {children}
        </>
    )
}

export default layout