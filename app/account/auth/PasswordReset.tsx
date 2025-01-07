"use client"

import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/spinner"
import { Alert } from "@nextui-org/alert"
import { PasswordInput } from "./PasswordInput"

interface Props {
    onPasswordReset: (password: string, confirmPassword: string) => Promise<any>
    onNavToLogin: () => void
}

export const PasswordReset = (props: Props) => {
    const [bannerMessage, setBannerMessage] = useState<string>("")
    const [password, setPassword] = useState<string | undefined>()
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>()
    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    const resetPassword = async () => {
        if (password !== confirmPassword || !password || !confirmPassword) {
            setBannerMessage("Error: Passwords do not match")
            return
        }

        setBannerMessage("Resetting Password")

        setShowSpinner(true)
        try {
            const success = await props.onPasswordReset(password, confirmPassword).catch(e => console.log(e))
            success ? setBannerMessage("Password Reset! Please log in") : setBannerMessage("Error: Password was not reset")
        } catch (ex) {
            setBannerMessage("Error: Password reset failed")
        }
        setShowSpinner(false)
    }

    return (
        <div className="lg:w-96 w-52">
            {bannerMessage && <Alert color={bannerMessage.startsWith("Error:") ? "danger" : "success"}>{bannerMessage}</Alert>}
            <PasswordInput onPasswordChanged={setPassword} onSubmit={resetPassword} />
            <PasswordInput placeholder='confirm password' onPasswordChanged={setPassword} onSubmit={resetPassword} />
            <Button className='my-1 w-[100%]' onPress={resetPassword}>{showSpinner ? <Spinner /> : "Reset Password"}</Button >
            <Button className="my-1 w-[100%] bg-transparent" onPress={props.onNavToLogin}>
                {"Back To Login"}
            </Button>
        </div>
    )
}
