"use client"
// import { createClient } from '@supabase/supabase-js'
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
import { BaseAuthStore } from 'pocketbase'
import { useEffect, useState } from "react"
import { Link } from '@nextui-org/link'
import { button } from '@nextui-org/theme'
import { useTheme } from 'next-themes'
import { Spinner } from "@nextui-org/spinner"
import { usePocketBase } from '../state/usePocketBase'
import { title } from '@/components/primitives'
import { Login, LoginResponse } from '@/components/Login'


export default function AccountPage() {
    const pb = usePocketBase()
    const [authStore, setAuthStore] = useState<BaseAuthStore>()
    const getAuth = async () => (pb.authStore.isValid && pb.authStore.record) && setAuthStore(pb.authStore)

    const [loading, setLoading] = useState<boolean>(true)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const { theme } = useTheme()

    const onLogin = async (username: string, password: string): Promise<LoginResponse> => {
        const authData = await pb.collection("users").authWithPassword(username, password)

        if (authData) {
            setAuthStore(pb.authStore)
            return LoginResponse.SUCCESS
        } else {
            return LoginResponse.INVALID_CREDENTIALS
        }

    }


    const signOut = async () => {
        pb.authStore.clear()
        setAuthStore(undefined)
    }

    useEffect(() => {
        setLoading(true)
        getAuth()
        setLoading(false)
    }, [])

    if (loading) return <Spinner />
    if (authStore && authStore.record) {
        return <>
            <div className="pb-24">
                <h1 className={title()}>
                    Welcome back{" "}
                    <span className={"text-orange-400"}>{authStore.record.email}</span>
                </h1>
            </div>
            <div>
                <div className="flex text-center justify-center">
                    <Link
                        isExternal
                        className={button({
                            variant: "shadow",
                            radius: "full",
                            color: "primary",
                        })}
                        onClick={signOut}
                    >
                        Sign Out
                    </Link>
                </div>
            </div>
        </>
    }
    else {
        return <Login
            onLogin={onLogin}
        />
    }
}
