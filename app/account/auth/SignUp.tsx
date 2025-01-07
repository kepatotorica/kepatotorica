"use client"

import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Spinner } from "@nextui-org/spinner"
import { Alert } from "@nextui-org/alert"
import { RecordModel } from "pocketbase"
import { PasswordInput } from "./PasswordInput"

export enum SignUpResponse {
    SUCCESS = 'SUCCESS',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

interface Props {
    onSignUp: (username: string, password: string, passwordConfirm: string) => Promise<RecordModel>
    onNavToLogIn: () => void
    onForgotPassword: (email: string) => Promise<void>
}

export const SignUp = (props: Props) => {
    const [bannerMessage, setBannerMessage] = useState<string>("")
    const [email, setEmail] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>()
    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    const signUp = async () => {
        if (!password || !email) {
            setBannerMessage("Error: Missing password or username")
            return
        }

        if (password !== confirmPassword || !password || !confirmPassword) {
            setBannerMessage("Error: Passwords do not match")
            return
        }

        setBannerMessage("Creating an account")

        setShowSpinner(true)
        try {
            await props.onSignUp(email, password, confirmPassword)
        } catch (ex: any) {
            if (ex?.originalError?.data?.data?.email?.code === "validation_not_unique") {
                setBannerMessage(`Error: Account already exists`)
            } else {
                setBannerMessage(`Error: An unknown error occured`)
            }
        }
        setShowSpinner(false)
    }

    const forgotPassword = async () => {
        setBannerMessage(`Sending an email to ${email}`)
        if (email) {
            await props.onForgotPassword(email)
            setBannerMessage(`An email has been sent to ${email} to reset your password`)
        } else {
            setBannerMessage("Error: Please enter an email")
        }
    }

    return (
        <div className="lg:w-96 w-52">
            {bannerMessage && <Alert color={bannerMessage.startsWith("Error:") ? "danger" : "success"}>{bannerMessage}</Alert>}
            <Input className='py-3' placeholder='email' onChange={e => setEmail(e.target.value)} />
            <PasswordInput onPasswordChanged={setPassword} onSubmit={signUp} />
            <PasswordInput placeholder='confirm password' onPasswordChanged={setConfirmPassword} onSubmit={signUp} />
            <Button className='my-1 w-[100%]' onPress={signUp}>{showSpinner ? <Spinner /> : "Sign Up"}</Button >
            <Button className='my-1 w-[100%] bg-transparent' onPress={props.onNavToLogIn}>{"Log In"}</Button >
            <Button className='my-1 w-[100%] bg-transparent' onPress={forgotPassword}>{"Forgot Password"}</Button >
        </div>
    )
}
