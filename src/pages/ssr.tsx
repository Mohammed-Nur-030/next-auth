
import { Inter } from 'next/font/google'
import { Button, Typography } from "@mui/material";
import {signIn, useSession, signOut} from "next-auth/react"
import {getServerSession} from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { NextPageContext } from 'next';

export default function Ssr({session}) {
    console.log("Session,",session)

    return (
        <div style={{height: 60, background: "white", padding: 10}}>
            {session?.user && <div style={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h4"} style={{color: "black"}}>
                    {session.user?.email}
                </Typography>
                <div>
                    <Button variant={"contained"} onClick={() => signOut()}>Logout</Button>
                </div>
            </div>}
            {!session && <div style={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant={"h4"} style={{color: "black"}}>
                    Coursera
                </Typography>
                <div>
                    <Button variant={"contained"} onClick={() => signIn()}>Sign up</Button>
                </div>
            </div>}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)
    console.log("Session in server,",session)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
        },
    }
}