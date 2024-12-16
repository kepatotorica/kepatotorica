"use client"
import { createClient } from '@supabase/supabase-js'
import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAtom } from 'jotai'
import { Link } from '@nextui-org/link';
import { button } from '@nextui-org/theme';
import { useTheme } from 'next-themes';

import { sessionAtom } from '../atoms/sessionAtom';

import { title } from '@/components/primitives';


const supabase = createClient('https://hquhiplatobehfftweut.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxdWhpcGxhdG9iZWhmZnR3ZXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMTQ0NTIsImV4cCI6MjA0OTg5MDQ1Mn0.1VG4K0SAPEu9Kvon3Lv7hydjs_nGayLSAUAyrBpVCU8')


export default function AccountPage() {
    const [session, setSession] = useAtom(sessionAtom);
    const { theme } = useTheme();

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (session) {
        return <>
            <div className="pb-24">
                <h1 className={title()}>
                    Welcome back{" "}
                    <span className={"text-orange-400"}>{session?.user.email}</span>
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
        //TODOASDF I need to completely replace this auth component here. It does not play nicely with my dark mode
        const supaTheme = theme === "dark" ? ThemeSupa : "dark"

        return (<Auth appearance={{ theme: ThemeSupa }} providers={[]} supabaseClient={supabase} />)
    }
}
