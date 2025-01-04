"use client"

import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Spinner } from "@nextui-org/spinner"
import { Alert } from "@nextui-org/alert"
import { Link } from "@nextui-org/react"

interface Props {
    onPasswordReset: (password: string, confirmPassword: string) => Promise<any>
}

export const PasswordReset = (props: Props) => {
    const [password, setPassword] = useState<string | undefined>()
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>()
    const [bannerMessage, setBannerMessage] = useState<string>("")
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
            <Input className='py-3' placeholder='password' type="text" onChange={e => setPassword(e.target.value)} onKeyUp={e => e.key === "Enter" && resetPassword()} />
            <Input className='py-3' placeholder='confirm password' type="text" onChange={e => setConfirmPassword(e.target.value)} onKeyUp={e => e.key === "Enter" && resetPassword()} />
            <Button className='my-1 w-[100%]' onPress={resetPassword}>{showSpinner ? <Spinner /> : "Reset Password"}</Button >
            <Link href="/account">
                <Button className="my-1 w-[100%] bg-transparent">
                    {"Back To Login"}
                </Button>
            </Link>
        </div>
    )
}
