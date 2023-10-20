import { useWallet } from './useWallet'
import { useCallback, useMemo, useState } from 'react'

export const useDisconnect = () => {
    const { disconnecting, setDisconnecting, adapter, setSelectedWalletName } = useWallet()
    const [error, setError] = useState(null)

    const disconnect = useCallback(async () => {
        if (disconnecting) return
        if (!adapter) return setSelectedWalletName(null)

        setDisconnecting(true)

        try {
            await adapter.disconnect()
        } catch (error: any) {
            // Clear the selected wallet
            setSelectedWalletName(null)
            // Rethrow the error, and handleError will also be called
            setError(error)
        } finally {
            setDisconnecting(false)
        }
    }, [disconnecting, adapter, setSelectedWalletName])

    return useMemo(() => ({ disconnect, disconnecting, error }), [disconnect, disconnecting, error])
}
