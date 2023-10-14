import {
    WalletNotConnectedError,
    WalletNotSelectedError,
} from '@demox-labs/aleo-wallet-adapter-base'
import { useWallet } from './useWallet'
import { useCallback, useEffect, useState } from 'react'

export const useDecrypt = ({
    cipherText,
    tpk,
    programId,
    functionName,
    index,
}: {
    cipherText: string
    tpk?: string
    programId?: string
    functionName?: string
    index?: number
}) => {
    const [decryptedText, setDecryptedText] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)
    const { adapter, connected } = useWallet()

    const decrypt = useCallback(async () => {
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
    }, [cipherText, tpk, programId, functionName, index])

    useEffect(() => {
        decrypt()
    }, [cipherText, tpk, programId, functionName, index])

    return { decryptedText, loading, error }
}
