import React, { useMemo} from "react";
import "./App.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { SlopeWalletAdapter } from "@solana/wallet-adapter-wallets";
import Blog from "./page/Blog";
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  const endPoint = "http://127.0.0.1:8899";
  const wallets = useMemo(() => [new SlopeWalletAdapter()], [endPoint]);

  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Blog/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
