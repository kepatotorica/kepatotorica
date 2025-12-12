import AccountPage from "./AccountPage"
import { Suspense } from 'react'

export default function Page() {
    return (
        <Suspense fallback={<div /> }>
            <AccountPage />
        </Suspense>
    )
}
