"use client"

import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Spinner } from "@nextui-org/spinner"
import { Alert } from "@nextui-org/alert"
import { PasswordInput } from "./PasswordInput"

export enum LoginResponse {
    SUCCESS = 'SUCCESS',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    NO_CREDENTIALS = 'NO_CREDENTIALS',
    ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

interface Props {
    onLogin: (email: string, password: string) => Promise<LoginResponse>
    onForgotPassword: (email: string) => Promise<void>
    onNavToSignUp: () => void
}

export const Login = (props: Props) => {
    const [email, setEmail] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()
    const [bannerMessage, setBannerMessage] = useState<string>("")
    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    const login = async () => {
        if (!password || !email) {
            setBannerMessage("Error: Missing password or username")
            return
        }


        setShowSpinner(true)
        try {
            const response = await props.onLogin(email, password)

            if (response == LoginResponse.INVALID_CREDENTIALS) {
                setBannerMessage("Error: Invalid credentials")
                console.log("Invalid Credentials")
            } else if (response == LoginResponse.SUCCESS) {
                console.log("LOGGED IN!")
            }
        } catch (ex: any) {
            setBannerMessage(`An unknown error occured`)
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
            <Input className='py-3' placeholder='email' type="email" onChange={e => setEmail(e.target.value)} />
            <PasswordInput onPasswordChanged={setPassword} onSubmit={login} />
            <Button className='my-1 w-[100%]' onPress={login}>{showSpinner ? <Spinner /> : "Login"}</Button >
            <Button className='my-1 w-[100%] bg-transparent' onPress={props.onNavToSignUp}>{"Sign Up"}</Button >
            <Button className='my-1 w-[100%] bg-transparent' onPress={forgotPassword}>{"Forgot Password"}</Button >
        </div>
    )
}
