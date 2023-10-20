import { useCallback, useMemo } from 'react'
import { useWallet } from './useWallet'
import { WalletName } from '@demox-labs/aleo-wallet-adapter-base'

export const useSelect = () => {
    const { setSelectedWalletName } = useWallet()

    const select = useCallback((walletName: WalletName) => {
        setSelectedWalletName(walletName)
    }, [])

    return useMemo(() => ({ select }), [select])
}
