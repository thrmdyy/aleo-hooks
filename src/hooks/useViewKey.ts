import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWallet } from './useWallet'
import {
    WalletError,
    WalletNotConnectedError,
    WalletNotSelectedError,
} from '@demox-labs/aleo-wallet-adapter-base'

export const useViewKey = ({ enabled }: { enabled: boolean } = { enabled: true }) => {
    const { adapter, connected } = useWallet()
    const [viewKey, setViewKey] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(enabled)
    const [error, setError] = useState<null | Error>(null)

    const requestViewKey = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
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
                throw new WalletError('Not implemented in your wallet provider')
            }
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [connected, adapter])

    useEffect(() => {
        if (enabled) {
            requestViewKey()
        }
    }, [requestViewKey])

    return useMemo(
        () => ({ viewKey, loading, error, requestViewKey }),
        [viewKey, loading, error, requestViewKey],
    )
}
