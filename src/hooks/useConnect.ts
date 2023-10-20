import { useCallback, useMemo, useState } from 'react'
import { useWallet } from './useWallet'
import {
    WalletName,
    WalletNotReadyError,
    WalletNotSelectedError,
    WalletReadyState,
} from '@demox-labs/aleo-wallet-adapter-base'

export const useConnect = () => {
    const {
        connecting,
        setConnecting,
        disconnecting,
        connected,
        handleError,
        setSelectedWalletName,
        decryptPermission,
        network,
        programs,
        wallets,
        publicKey,
    } = useWallet()
    const [error, setError] = useState(null)

    const connect = useCallback(
        async (walletName: WalletName) => {
            if (connecting || disconnecting || connected) return

            const wallet = wallets.find((wallet: any) => wallet.adapter.name === walletName)
            if (!wallet?.adapter) throw handleError(new WalletNotSelectedError())

            if (
                !(
                    wallet.readyState === WalletReadyState.Installed ||
                    wallet.readyState === WalletReadyState.Loadable
                )
            ) {
                // Clear the selected wallet
                setSelectedWalletName(null)

                if (typeof window !== 'undefined') {
                    window.open(wallet.adapter.url, '_blank')
                }

                throw handleError(new WalletNotReadyError())
            }

            setConnecting(true)

            try {
                await wallet.adapter.connect(decryptPermission, network, programs)

                setSelectedWalletName(walletName)
            } catch (error: any) {
                // Clear the selected wallet
                setSelectedWalletName(null)
                // Rethrow the error, and handleError will also be called
                setError(error)
            } finally {
                setConnecting(false)
            }
        },
        [connecting, disconnecting, connected, wallets, handleError, setSelectedWalletName],
    )

    return useMemo(
        () => ({ connected, connecting, connect, error, address: publicKey }),
        [connected, connecting, connect, error, publicKey],
    )
}
