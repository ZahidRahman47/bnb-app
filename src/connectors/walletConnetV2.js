import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

export const [walletConnectV2, hooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "fe76d54c3385e26a8188e9ff4f618ae0",
        chains: [56],
        optionalChains: [56],
        showQrModal: true,
        rpcMap: {
          56: "https://bsc-dataseed.binance.org/",
        },
        
        
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
