import { useWallet } from './useWallet'
import { useCallback, useState } from 'react'

export const useDisconnect = () => {
    const { disconnecting, setDisconnecting, adapter, setSelectedWalletName } = useWallet()
    const [error, setError] = useState<null | unknown>(null)

    const disconnect = useCallback(async () => {
        if (disconnecting) return
        if (!adapter) return setSelectedWalletName(null)

        setDisconnecting(true)

        try {
            await adapter.disconnect()
        } catch (error) {
            // Clear the selected wallet
            setSelectedWalletName(null)
            // Rethrow the error, and handleError will also be called
            setError(error)
        } finally {
            setDisconnecting(false)
        }
    }, [disconnecting, adapter, setSelectedWalletName])

    return { disconnect, disconnecting, error }
}
