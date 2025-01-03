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
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [showSpinner, setShowSpinner] = useState<boolean>(false)

    const resetPassword = async () => {
        if (password !== confirmPassword || !password || !confirmPassword) {
            setErrorMessage("Passwords do not match")
            return
        }

        setShowSpinner(true)
        await props.onPasswordReset(password, confirmPassword).catch(e => console.log(e))
        setShowSpinner(false)
    }

    return (
        <div className="lg:w-96 w-52">
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <Input className='py-3' placeholder='password' type="password" onChange={e => setPassword(e.target.value)} onKeyUp={e => e.key === "Enter" && resetPassword()} />
            <Input className='py-3' placeholder='confirm password' type="password" onChange={e => setConfirmPassword(e.target.value)} onKeyUp={e => e.key === "Enter" && resetPassword()} />
            <Button className='my-1 w-[100%]' onPress={resetPassword}>{showSpinner ? <Spinner /> : "Reset Password"}</Button >
            <Link href="/account">
                <Button className="my-1 w-[100%] bg-transparent">
                    {"Back To Login"}
                </Button>
            </Link>
        </div>
    )
}
