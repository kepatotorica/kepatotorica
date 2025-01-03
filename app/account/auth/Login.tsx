"use client"

import { useState } from "react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Spinner } from "@nextui-org/spinner"
import { Alert } from "@nextui-org/alert"

export enum LoginResponse {
    SUCCESS = 'SUCCESS',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    NO_CREDENTIALS = 'NO_CREDENTIALS',
    ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

interface Props {
    onLogin: (username: string, password: string) => Promise<LoginResponse>
    onForgotPassword: (email: string) => Promise<void>
}

export const Login = (props: Props) => {
    const [email, setEmail] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    const login = async () => {
        if (!password || !email) {
            setErrorMessage("Missing password or username")
            return
        }


        setShowSpinner(true)
        try {
            const response = await props.onLogin(email, password)

            if (response == LoginResponse.INVALID_CREDENTIALS) {
                setErrorMessage("Invalid credentials")
                console.log("Invalid Credentials")
            } else if (response == LoginResponse.SUCCESS) {
                console.log("LOGGED IN!")
            }
        } catch (ex: any) {
            setErrorMessage(`An unknown error occured`)
        }
        setShowSpinner(false)
    }

    const forgotPassword = async () => {
        if (email) {
            await props.onForgotPassword(email)
            console.log("Check your email for instructions to reset your password")
        } else {
            setErrorMessage("Please enter an email")
        }
    }

    return (
        <div className="lg:w-96 w-52">
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <Input className='py-3' placeholder='email' type="email" onChange={e => setEmail(e.target.value)} />
            <Input className='py-3' placeholder='password' type="password" onChange={e => setPassword(e.target.value)} onKeyUp={e => e.key === "Enter" && login()} />
            <Button className='my-1 w-[100%]' onPress={login}>{showSpinner ? <Spinner /> : "Login"}</Button >
            <Button className='my-1 w-[100%] bg-transparent' onPress={forgotPassword}>{"Forgot Password"}</Button >
        </div>
    )
}
