![](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjE2IiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjE2IDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNzMuNDI2IDBWOC45MzgyNEg4MS42ODQyVjc4Ljg5NjFIOTAuNjA0NVYwSDczLjQyNloiIGZpbGw9IiMxMjEyMTIiLz4KPHBhdGggZD0iTTE1NC4xNDUgNTEuNDIxNkMxNTQuMTQ1IDMyLjU1MTggMTQzLjY4MyAyMS4yOTcgMTI3LjYwNCAyMS4yOTdDMTExLjUyNiAyMS4yOTcgMTAwLjk1NCAzMi4wMDA3IDEwMC45NTQgNTAuODY4N0MxMDAuOTU0IDY5LjczNjcgMTExLjQxNSA4MCAxMjcuNjA0IDgwQzE0MC4zNzggODAgMTQ5Ljk2IDcyLjYwNjEgMTUyLjYwMyA2Mi4zNDQ3SDE0Mi42OTJDMTQwLjQ4OCA2Ny4wOTAyIDEzNS45NzUgNzEuMjgyOSAxMjcuNjA0IDcxLjI4MjlDMTE2LjgxMiA3MS4yODI5IDExMS4zMDcgNjQuNDQxOSAxMTAuMjA1IDU0LjYyMDlIMTU0LjE0NVY1MS40MjE2Wk0xMTAuMzE2IDQ2LjEyNUMxMTEuNjM2IDM2LjYzNTcgMTE3LjM2NCAyOS45MDM1IDEyNy42MDQgMjkuOTAzNUMxMzcuODQ1IDI5LjkwMzUgMTQzLjI0MiAzNi41MjUxIDE0NC41NjQgNDYuMTI1SDExMC4zMTZaIiBmaWxsPSIjMTIxMjEyIi8+CjxwYXRoIGQ9Ik0xODkuMjcyIDIxLjI5N0MxNzMuMDgzIDIxLjI5NyAxNjIuNjIyIDMyLjAwMDcgMTYyLjYyMiA1MC44Njg3QzE2Mi42MjIgNjkuNzM2NyAxNzMuMDgzIDgwIDE4OS4yNzIgODBDMjA1LjQ2MSA4MCAyMTUuODEyIDcwLjA2ODQgMjE1LjgxMiA1MC44Njg3QzIxNS44MTIgMzEuNjY5IDIwNS4zNTEgMjEuMjk3IDE4OS4yNzIgMjEuMjk3Wk0xODkuMjcyIDcxLjUwNDFDMTc3LjcwOSA3MS41MDQxIDE3MS40MzIgNjIuNDU1MyAxNzEuNDMyIDUwLjc2QzE3MS40MzIgMzkuMDY0NyAxNzcuNzA5IDI5LjY4NDIgMTg5LjI3MiAyOS42ODQyQzIwMC44MzYgMjkuNjg0MiAyMDcuMDAzIDM4Ljg0MzYgMjA3LjAwMyA1MC43NkMyMDcuMDAzIDYyLjY3NjQgMjAwLjk0NiA3MS41MDQxIDE4OS4yNzIgNzEuNTA0MVoiIGZpbGw9IiMxMjEyMTIiLz4KPHBhdGggZD0iTTQ2LjU1NjUgMEgyOC4zODQ5TDEyLjYxMzQgNDYuMTI1SDIyLjIxNzlMMzQuOTkzMyA4LjQ5NTkzSDM5LjYxODlMNTIuMzkyNSA0Ni4xMjVIMjIuMjE3OUwxOS4yNDU3IDU0LjYyMDlINTUuMjU2MUw2My41MTQzIDc4Ljg5NjFINzMuNDI2TDQ2LjU1NjUgMFoiIGZpbGw9IiMxMjEyMTIiLz4KPHBhdGggZD0iTTEuNDA1MDggNzguODk2MUgxMC45ODU3TDE5LjI0NTcgNTQuNjIwOUw5LjcwNzQgNTQuNjIwOUwxLjQwNTA4IDc4Ljg5NjFaIiBmaWxsPSIjMTIxMjEyIi8+CjxwYXRoIGQ9Ik0zLjA5MzUgNDYuMTI1TDAuMTg3NSA1NC42MjA5SDkuNzA3NEwxMi42MTM0IDQ2LjEyNUgzLjA5MzVaIiBmaWxsPSIjMTIxMjEyIi8+Cjwvc3ZnPgo=)

# Aleo Hooks

[TOC]

## Quick Setup (using React UI)

#### 📲Install

Install these dependencies:

```javascript
npm install --save aleo-hooks @demox-labs/aleo-wallet-adapter-leo
```

#### 🛠️Setup

```javascript
import { useMemo } from 'react'
import logo from './logo.svg'
import { WalletProvider } from 'aleo-hooks'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'

import './App.css'

function App() {
    const wallets = useMemo(() => [new LeoWalletAdapter({ appName: 'Create React App' })], [])

    return (
        <WalletProvider wallets={wallets} autoConnect>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </WalletProvider>
    )
}

export default App
```

## How to use

#### useConnect

The connection flow for the aleo wallets extension goes like this:

```javascript
import { FC } from 'react'
import { useConnect } from 'aleo-hooks'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'

export const UseConnect: FC = () => {
    const { connect, connected, connecting, error } = useConnect()

    const connectHandler = () => connect(LeoWalletName)

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {connected && <p>Successfuly connected</p>}
            {error && <p>Something went wrong {JSON.stringify(error)}</p>}
            <button disabled={connecting} onClick={connectHandler}>Connect aleo wallet</button>
        </div>
    )
}
```

#### useSelect

Use this hook for selecting current aleo wallet

```javascript
import { FC } from 'react'
import { useSelect } from 'aleo-hooks'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'

export const UseSelect: FC = () => {
    const { select } = useSelect()

    const selectHandler = () => select(LeoWalletName)

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button onClick={selectHandler}>Select Leo wallet</button>
        </div>
    )
}
```

#### useDisconnect

Use this hook for disconnect current aleo wallet

```javascript
import { FC } from 'react'
import { useDisconnect } from 'aleo-hooks'

export const UseDisconnect: FC = () => {
    const { disconnect, disconnecting, error } = useDisconnect()

    const selectHandler = () => disconnect()

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {error && <p>Something went wrong {JSON.stringify(error)}</p>}
            <button disabled={disconnecting} onClick={selectHandler}>disconnect</button>
        </div>
    )
}
```

#### useDecrypt

For decrypting ciphered text

```javascript
import { FC } from 'react'
import { useDecrypt } from 'aleo-hooks'

export const UseDecrypt: FC = () => {
    const { decryptedText, loading, error } = useDecrypt({ cipherText: 'ciphertext1qgqtzwpwj2r0rw0md3zxlnnj9h7azun02f6tdm27u8ywxcsuw4pssp7xsp7edm749l4pd9s47wksc475dkhmjnl7yrzzylgnfyx2kfwkpqlsynj2' })

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong {JSON.stringify(error)}</p>}
            {decryptedText && <p>Decrypted text: {decryptedText}</p>}
        </div>
    )
}
```

#### useViewKey

If adapter supporting fetching view key

```javascript
import { FC } from 'react'
import { useViewKey } from 'aleo-hooks'

export const UseViewKey: FC = () => {
    const { viewKey, requestViewKey, error, loading } = useViewKey()

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong {JSON.stringify(error)}</p>}
            {viewKey && <p>View key: {viewKey}</p>}
            <button disabled={loading} onClick={requestViewKey}>Request view key</button>
        </div>
    )
}
```
