import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

export const [walletConnectV2, hooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "fe76d54c3385e26a8188e9ff4f618ae0",
        chains: [97],
        optionalChains: [97],
        showQrModal: true,
        // rpcMap: {
        //   97: "https://bnb-testnet.g.alchemy.com/v2/_CvIu4YdUXqicospC3JG4kE5NZsX8Sjl",
        // },
        
        
      },
      metadata: {
        name: "BNB-Wallet-App",
        description: "BNB-Wallet-App ",
        url: ""
       
      },
      onError: (err) => {
        localStorage?.clear();
      },
    })
);
