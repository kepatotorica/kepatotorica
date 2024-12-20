import PocketBase, { BaseAuthStore } from 'pocketbase'
import { useEffect, useState } from 'react'

const pb = new PocketBase('https://kepatotorica.pockethost.io/')

export const useAuthStore = () => {
  const [authStore, setAuthStore] = useState<BaseAuthStore | null>(
    pb.authStore.isValid ? pb.authStore : null
  )

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthStore(pb.authStore.isValid ? pb.authStore : null)
    }

    pb.authStore.onChange(handleAuthChange)

    return () => {
        pb.authStore.onChange(() => {})
      }
  }, [])

  return authStore
}
