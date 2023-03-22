import React from "react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";

import MainPage from "pages/MainPage";

import "styles/main.scss";

const PROJECT_ID = "61543626b25c5e5c7ee6418df567364f";

const chains = [polygon, polygonMumbai]; // TODO: удалить polygonMumbai при релизе на продакшн

const { provider } = configureChains(chains, [
  w3mProvider({ projectId: PROJECT_ID }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId: PROJECT_ID, version: 1, chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <MainPage />
      </WagmiConfig>

      <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
