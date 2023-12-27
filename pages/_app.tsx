import '../styles/tailwind.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygonMumbai, bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { lightTheme } from '@rainbow-me/rainbowkit';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygonMumbai, bscTestnet],
  [publicProvider()]
);

const projectId = String(process.env.REACT_APP_WALLET_CONNECT);

const { connectors } = getDefaultWallets({
  appName: "Bank Recycle Waste",
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: "#2FAB73",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
        })}
        chains={chains}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
