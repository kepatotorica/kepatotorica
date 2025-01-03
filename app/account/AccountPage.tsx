"use client"
// import { createClient } from '@supabase/supabase-js'
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
import PocketBase, { BaseAuthStore } from "pocketbase"
import { useEffect, useState } from "react"
import { Link } from '@nextui-org/link'
import { button } from '@nextui-org/theme'
import { Spinner } from "@nextui-org/spinner"
import { useSearchParams } from "next/navigation"
import { PasswordReset } from "./auth/PasswordReset"
import { title } from '@/components/primitives'
import { Login, LoginResponse } from '@/app/account/auth/Login'


const pb = new PocketBase('https://kepatotorica.pockethost.io/')

enum actions {
    login = 'login',
    confirmPasswordReset = 'confirm-password-reset',
}

export default function AccountPage() {
    const [authStore, setAuthStore] = useState<BaseAuthStore>()
    const searchParams = useSearchParams()

    const actionParameter = searchParams.get('action')?.valueOf() || 'Login'
    const token = searchParams.get('token') || ""

    const getAuth = async () => (pb.authStore.isValid && pb.authStore.record) && setAuthStore(pb.authStore)

    const [loading, setLoading] = useState<boolean>(true)

    const onLogin = async (username: string, password: string): Promise<LoginResponse> => {
        const authData = await pb.collection("users").authWithPassword(username, password)

        if (authData) {
            setAuthStore(pb.authStore)
            return LoginResponse.SUCCESS
        } else {
            return LoginResponse.INVALID_CREDENTIALS
        }
    }

    const onForgotPassword = async (email: string) => {
        await pb.collection('users').requestPasswordReset(email, {})
    }

    const onPasswordReset = async (password: string, confirmPassword: string) => {
        await pb.collection('users').confirmPasswordReset(
            token,
            password,
            confirmPassword,
        )
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


    const renderContent = () => {
        switch (actionParameter) {
            case actions.confirmPasswordReset:
                return <PasswordReset onPasswordReset={onPasswordReset} />
            default:
                return <Login
                    onForgotPassword={onForgotPassword}
                    onLogin={onLogin}
                />
        }
    }

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
                        onPress={signOut}
                    >
                        Sign Out
                    </Link>
                </div>
            </div>
        </>
    }
    else {
        return renderContent()
    }
}
