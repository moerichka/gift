import React from "react";
import { SnackbarProvider } from "notistack";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";

import MainPage from "pages/MainPage";
import SnackBar from "components/SnackBar";

import "styles/main.scss";

const PROJECT_ID = "61543626b25c5e5c7ee6418df567364f";

const chains = [polygon, polygonMumbai]; // TODO: удалить polygonMumbai при релизе на продакшн

const { provider } = configureChains(chains, [
  w3mProvider({ projectId: PROJECT_ID }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId: PROJECT_ID, version: 2, chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

declare module "notistack" {
  interface VariantOverrides {
    trace: {
      customTitle?: React.ReactNode;
      customMessage?: React.ReactNode;
      type?: "error" | "default" | "correct";
    };
  }
}

function App() {
  return (
    <>
      <SnackbarProvider
        Components={{
          trace: SnackBar,
        }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <WagmiConfig client={wagmiClient}>
          <MainPage />
        </WagmiConfig>
      </SnackbarProvider>

      <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
