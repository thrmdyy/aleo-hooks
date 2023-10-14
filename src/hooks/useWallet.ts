/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from 'react'
import {
    Adapter,
    DecryptPermission,
    WalletAdapterNetwork,
    WalletName,
    WalletReadyState,
    WalletError,
} from '@demox-labs/aleo-wallet-adapter-base'

export interface Wallet {
    adapter: Adapter
    readyState: WalletReadyState
}

export interface WalletContextState {
    selectedWalletName: WalletName | null
    setSelectedWalletName: (value: WalletName | null) => void
    connecting: boolean
    setConnecting: (value: boolean) => void
    disconnecting: boolean
    setDisconnecting: (value: boolean) => void
    decryptPermission: DecryptPermission
    network: WalletAdapterNetwork
    programs: string[]
    readyState: WalletReadyState
    connected: boolean
    handleError: (error: WalletError) => WalletError | void
    publicKey: string | null
    wallet: Wallet | null
    wallets: Wallet[]
    adapter: Adapter | null
}

const DEFAULT_CONTEXT = {
    selectedWalletName: null,
    setSelectedWalletName: (_value: WalletName) =>
        console.error(constructMissingProviderErrorMessage('get', 'setSelectedWalletName')),
    connecting: false,
    setConnecting: (_value: boolean) =>
        console.error(constructMissingProviderErrorMessage('get', 'setConnecting')),
    disconnecting: false,
    setDisconnecting: (_value: boolean) =>
        console.error(constructMissingProviderErrorMessage('get', 'setDisconnecting')),
    decryptPermission: DecryptPermission.NoDecrypt,
    network: WalletAdapterNetwork.Testnet,
    programs: [],
    readyState: WalletReadyState.Unsupported,
    connected: false,
    handleError: (_error: WalletError) =>
        console.error(constructMissingProviderErrorMessage('get', 'handleError')),
    publicKey: null,
    wallet: null,
    wallets: [],
    adapter: null,
} as WalletContextState

function constructMissingProviderErrorMessage(action: string, valueName: string) {
    return (
        'You have tried to ' +
        ` ${action} "${valueName}"` +
        ' on a WalletContext without providing one.' +
        ' Make sure to render a WalletProvider' +
        ' as an ancestor of the component that uses ' +
        'WalletContext'
    )
}

export const WalletContext: any = createContext<WalletContextState>(
    DEFAULT_CONTEXT as WalletContextState,
)

export function useWallet(): WalletContextState {
    return useContext(WalletContext)
}
