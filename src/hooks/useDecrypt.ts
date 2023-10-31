import {
    WalletNotConnectedError,
    WalletNotSelectedError,
} from '@demox-labs/aleo-wallet-adapter-base'
import { useWallet } from './useWallet'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface IUseDecryptArguments {
    cipherText: string
    tpk?: string
    programId?: string
    functionName?: string
    index?: number
    enabled?: boolean
}

export const useDecrypt = ({
    cipherText,
    tpk,
    programId,
    functionName,
    index,
    enabled = true,
}: IUseDecryptArguments) => {
    const [decryptedText, setDecryptedText] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(enabled)
    const [error, setError] = useState(null)
    const { adapter, connected } = useWallet()

    const decrypt = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            if (!connected) {
                throw new WalletNotConnectedError()
            }

            if (!adapter) {
                throw new WalletNotSelectedError()
            }

            if (adapter && 'decrypt' in adapter) {
                const decryptedText = await adapter.decrypt(
                    cipherText,
                    tpk,
                    programId,
                    functionName,
                    index,
                )

                setDecryptedText(decryptedText)
            }
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [connected, adapter, cipherText, tpk, programId, functionName, index])

    useEffect(() => {
        if (enabled) {
            decrypt()
        }
    }, [decrypt, enabled])

    return useMemo(
        () => ({ decryptedText, loading, error, decrypt }),
        [decryptedText, loading, error, decrypt],
    )
}
