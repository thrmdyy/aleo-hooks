
# Aleo Hooks

[TOC]

## Quick Setup (using React UI)

#### 📲Install

Install hook library:

`npm install aleo-hooks`

Install adapters to the wallets you want to support:

- Leo Wallet: `npm install @demox-labs/aleo-wallet-adapter-leo`
- Puzzle: TBD

#### 🛠️Quick start


```
npx create-react-app aleo_dapp 
cd aleo_dapp
```

Install hook library:

`npm install aleo-hooks`

Install adapters to the wallets you want to support:

- Leo Wallet: `npm install @demox-labs/aleo-wallet-adapter-leo`

Replace code in `src/App.js` with:

```javascript
import { useMemo } from "react";
import { WalletProvider, useConnect, useDisconnect } from "aleo-hooks";
import {
  LeoWalletAdapter,
  LeoWalletName,
} from "@demox-labs/aleo-wallet-adapter-leo";

import "./App.css";

function App() {
  const wallets = useMemo(
    () => [new LeoWalletAdapter({ appName: "Create React App" })],
    []
  );

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <div className="App">
        <UseConnect></UseConnect>
      </div>
    </WalletProvider>
  );
}

export const UseConnect = () => {
  const connectHandler = () => connect(LeoWalletName);
  const disconnectHandler = () => disconnect();

  const { connect, connected, connecting, address } = useConnect();
  const { disconnect, disconnecting } = useDisconnect();

  return (
    <div>
      {connected ? (
        <>
          <p>Successfuly connected {address}</p>
          <button disabled={disconnecting} onClick={disconnect}>
            Disconnect
          </button>
        </>
      ) : (
        <>
          <p>The wallet is disconnected</p>
          <button disabled={connecting} onClick={connectHandler}>
            Connect Leo wallet
          </button>
        </>
      )}{" "}
    </div>
  );
};

export default App;

```

This code will create a blank page with a Connect/Disconnect button for Leo Wallet.

Launch it with:

`npm start`

and build your next big Aleo dApp!

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
        <div>
            {connected && <p>Successfuly connected</p>}
            {error && <p>Something went wrong {JSON.stringify(error)}</p>}
            <button disabled={connecting} onClick={connectHandler}>Connect aleo wallet</button>
        </div>
    )
}
```

#### useSelect

Use this hook for selecting current Aleo wallet. This hook is required when your frontend supports more than one wallet, e.g. Leo and Puzzle. 

```javascript
import { FC } from 'react'
import { useSelect } from 'aleo-hooks'
import { LeoWalletName } from '@demox-labs/aleo-wallet-adapter-leo'

export const UseSelect: FC = () => {
    const { select } = useSelect()

    const selectHandler = () => select(LeoWalletName)

    return (
        <div>
            <button onClick={selectHandler}>Select Leo wallet</button>
        </div>
    )
}
``` 

#### useDisconnect

Use this hook to disconnect current Aleo wallet:

```javascript
import { FC } from 'react'
import { useDisconnect } from 'aleo-hooks'

export const UseDisconnect: FC = () => {
    const { disconnect, disconnecting, error } = useDisconnect()

    const disconnectHandler = () => disconnect()

    return (
        <div>
            {error && <p>Something went wrong {JSON.stringify(error)}</p>}
            <button disabled={disconnecting} onClick={disconnectHandler}>disconnect</button>
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
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong {JSON.stringify(error)}</p>}
            {decryptedText && <p>Decrypted text: {decryptedText}</p>}
        </div>
    )
}
```

#### useViewKey

If adapter supporting fetching a view key, this hook returns a plaintext view key. 

```javascript
import { FC } from 'react'
import { useViewKey } from 'aleo-hooks'

export const UseViewKey: FC = () => {
    const { viewKey, requestViewKey, error, loading } = useViewKey()

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong {JSON.stringify(error)}</p>}
            {viewKey && <p>View key: {viewKey}</p>}
            <button disabled={loading} onClick={requestViewKey}>Request view key</button>
        </div>
    )
}
```
