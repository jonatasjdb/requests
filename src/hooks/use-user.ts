import React from "react"
import { api, fetcher } from "../helpers/api"
import type { User } from "../models/user"

export default function useUser() {
    const [user, setUser] = React.useState<User | null>(null)
    const [userRequestStatus, setUserRequestStatus] = React.useState<'idle' | 'loading' | 'saving'>('idle')

    const getUser = React.useCallback(async (id: string) => {
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

    async function createuser(payload: User) {
        try {
            setUserRequestStatus('saving')

            await api('/users', {method: 'POST', body: JSON.stringify(payload)})

            alert('Usuário criado com sucesso!')
        } catch (error) {
            console.error(error)
        } finally {
            setUserRequestStatus('idle')
        }
    }


    return {
        user,
        userRequestStatus,
        getUser,
        createuser
    }
}