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
import HeightSetter from "components/helpers/HeightSetter";

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

      <HeightSetter />
      <Web3Modal
        projectId={PROJECT_ID}
        ethereumClient={ethereumClient}
        themeVariables={{
          "--w3m-z-index": "2500",
          "--w3m-background-color": "hsla(32, 100%, 62%, 1)",
          "--w3m-accent-color": "hsla(32, 100%, 62%, 1)",
        }}
      />
    </>
  );
}

export default App;
