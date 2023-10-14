import {
    Adapter,
    WalletError,
    WalletName,
    WalletReadyState,
    DecryptPermission,
    WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base'
import type { FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Wallet } from '../hooks/useWallet'
import { WalletContext } from '../hooks/useWallet'

export interface WalletProviderProps {
    children: any
    wallets: Adapter[]
    decryptPermission?: DecryptPermission
    programs?: string[]
    network?: WalletAdapterNetwork
    autoConnect?: boolean
    onError?: (error: WalletError) => void
    localStorageKey?: string
}

const initialState: {
    wallet: Wallet | null
    adapter: Adapter | null
    publicKey: string | null
    connected: boolean
} = {
    wallet: null,
    adapter: null,
    publicKey: null,
    connected: false,
}

export const WalletProvider: FC<WalletProviderProps> = ({
    children,
    wallets: adapters,
    autoConnect = false,
    decryptPermission = DecryptPermission.NoDecrypt,
    network = WalletAdapterNetwork.Testnet,
    onError,
    localStorageKey = 'walletName',
    programs = [],
}) => {
    const [selectedWalletName, setSelectedWalletName] = useLocalStorage<WalletName | null>(
        localStorageKey,
        null,
    )
    const [{ wallet, adapter, publicKey, connected }, setState] = useState(initialState)
    const readyState = adapter?.readyState || WalletReadyState.Unsupported
    const [disconnecting, setDisconnecting] = useState(false)
    const [connecting, setConnecting] = useState(false)

    const isUnloading = useRef(false)

    // Wrap adapters to conform to the `Wallet` interface
    const [wallets, setWallets] = useState(() =>
        adapters.map((adapter) => ({
            adapter,
            readyState: adapter.readyState,
        })),
    )

    // When the adapters change, start to listen for changes to their `readyState`
    useEffect(() => {
        // When the adapters change, wrap them to conform to the `Wallet` interface
        setWallets((wallets) =>
            adapters.map((adapter, index) => {
                const wallet = wallets[index]
                // If the wallet hasn't changed, return the same instance
                return wallet &&
                    wallet.adapter === adapter &&
                    wallet.readyState === adapter.readyState
                    ? wallet
                    : {
                          adapter: adapter,
                          readyState: adapter.readyState,
                      }
            }),
        )

        function handleReadyStateChange(this: Adapter, readyState: WalletReadyState) {
            setWallets((prevWallets) => {
                const index = prevWallets.findIndex(({ adapter }) => adapter === this)
                if (index === -1) return prevWallets

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { adapter } = prevWallets[index]!
                return [
                    ...prevWallets.slice(0, index),
                    { adapter, readyState },
                    ...prevWallets.slice(index + 1),
                ]
            })
        }

        adapters.forEach((adapter) =>
            adapter.on('readyStateChange', handleReadyStateChange, adapter),
        )
        return () =>
            adapters.forEach((adapter) =>
                adapter.off('readyStateChange', handleReadyStateChange, adapter),
            )
    }, [adapters])

    // When the selected wallet changes, initialize the state
    useEffect(() => {
        const wallet =
            selectedWalletName && wallets.find(({ adapter }) => adapter.name === selectedWalletName)
        if (wallet) {
            setState({
                wallet,
                adapter: wallet.adapter,
                connected: wallet.adapter.connected,
                publicKey: wallet.adapter.publicKey,
            })
        } else {
            setState(initialState)
        }
    }, [selectedWalletName, wallets])

    // If the window is closing or reloading, ignore disconnect and error events from the adapter
    useEffect(() => {
        function listener() {
            isUnloading.current = true
        }

        window.addEventListener('beforeunload', listener)
        return () => window.removeEventListener('beforeunload', listener)
    }, [isUnloading])

    // Handle the adapter's connect event
    const handleConnect = useCallback(() => {
        if (!adapter) return

        setState((state) => ({
            ...state,
            connected: adapter.connected,
            publicKey: adapter.publicKey,
        }))
    }, [adapter])

    // Handle the adapter's disconnect event
    const handleDisconnect = useCallback(() => {
        // Clear the selected wallet unless the window is unloading
        if (!isUnloading.current) setSelectedWalletName(null)
    }, [isUnloading, setSelectedWalletName])

    // Handle the adapter's error event, and local errors
    const handleError = useCallback(
        (error: WalletError) => {
            // Call onError unless the window is unloading
            if (!isUnloading.current) (onError || console.error)(error)
            return error
        },
        [isUnloading, onError],
    )

    // Setup and teardown event listeners when the adapter changes
    useEffect(() => {
        if (adapter) {
            adapter.on('connect', handleConnect)
            adapter.on('disconnect', handleDisconnect)
            adapter.on('error', handleError)
            return () => {
                adapter.off('connect', handleConnect)
                adapter.off('disconnect', handleDisconnect)
                adapter.off('error', handleError)
            }
        }
    }, [adapter, handleConnect, handleDisconnect, handleError])

    // When the adapter changes, disconnect the old one
    useEffect(() => {
        return () => {
            adapter?.disconnect()
        }
    }, [adapter])

    // If autoConnect is enabled, try to connect when the adapter changes and is ready
    useEffect(() => {
        if (
            connecting ||
            connected ||
            !autoConnect ||
            !adapter ||
            !(readyState === WalletReadyState.Installed || readyState === WalletReadyState.Loadable)
        )
            return
        ;(async function () {
            setConnecting(true)
            try {
                await adapter.connect(decryptPermission, network, programs)
            } catch (error: any) {
                // Clear the selected wallet
                setSelectedWalletName(null)
                // Don't throw error, but handleError will still be called
            } finally {
                setConnecting(false)
            }
        })()
    }, [connecting, connected, autoConnect, adapter, readyState, setSelectedWalletName])

    return (
        <WalletContext.Provider
            value={{
                selectedWalletName,
                setSelectedWalletName,
                connecting,
                setConnecting,
                disconnecting,
                setDisconnecting,
                decryptPermission,
                network,
                programs,
                readyState,
                connected,
                handleError,
                publicKey,
                wallet,
                wallets,
                adapter,
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}
