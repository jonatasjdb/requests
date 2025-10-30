import React from "react"
import { fetcher } from "../helpers/api"
import type { User } from "../models/user"

export default function useUser() {
    const [user, setUser] = React.useState<User | null>(null)
    const [userRequestStatus, setUserRequestStatus] = React.useState<'idle' | 'loading' | 'saving'>('idle')

    const getUser = React.useCallback(async (id: number) => {
        try {
            setUserRequestStatus('loading')

            const data = await fetcher(`/users/${id}`)

            setUser(data)
        } catch(e) {
            console.error(e)
        } finally {
            setUserRequestStatus("idle")
        }
    }, [])


    return {
        user,
        userRequestStatus,
        getUser
    }
}