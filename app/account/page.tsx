"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Spinner } from "@nextui-org/react"
import AccountPage from "./AccountPage"

export default function Page() {
    const searchParams = useSearchParams()
    return <Suspense fallback={<Spinner />}>
        <AccountPage searchParams={searchParams} />
    </Suspense>
}
