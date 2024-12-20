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
}

export const Login = (props: Props) => {
    const [username, setUsername] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    const login = async () => {
        if (!password || !username) {
            setErrorMessage("Missing password or username")
            return
        }


        setShowSpinner(true)
        try {
            const response = await props.onLogin(username, password)

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

    return (
        <>
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <Input className='py-3' placeholder='username/email' onChange={e => setUsername(e.target.value)} />
            <Input className='py-3' placeholder='password' onChange={e => setPassword(e.target.value)} />
            <Button className='my-1 w-[100%]' onClick={login}>{showSpinner ? <Spinner /> : "Login"}</Button >
        </>
    )
}
