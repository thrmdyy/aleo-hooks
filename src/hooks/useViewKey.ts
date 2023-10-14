import { useCallback, useEffect, useState } from 'react'
import { useWallet } from '.'
import {
    WalletError,
    WalletNotConnectedError,
    WalletNotSelectedError,
} from '@demox-labs/aleo-wallet-adapter-base'

export const useViewKey = () => {
    const { adapter, connected } = useWallet()
    const [viewKey, setViewKey] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)

    const requestViewKey = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            // if (!connected) throw handleError(new WalletNotConnectedError())
            // if (!adapter) throw handleError(new WalletNotSelectedError())

            if (!connected) {
                throw new WalletNotConnectedError()
            }

            if (!adapter) {
                throw new WalletNotSelectedError()
            }

            if (adapter && 'requestViewKey' in adapter) {
                const viewKey = await (adapter as any).requestViewKey()

                setViewKey(viewKey)
            } else {
                throw new WalletError('Not implemented')
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        requestViewKey()
    }, [])

    return { viewKey, loading, error, requestViewKey }
}
