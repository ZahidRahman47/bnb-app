import React from 'react';
import { createRoot } from 'react-dom/client'; // Ensure React 18+
// import './index.css';
import "./styles/main.scss";

import App from './App';
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";
import { hooks as walletConnectV2Hooks, walletConnectV2 } from './connectors/walletConnetV2.js';
import { hooks as metaMaskHooks, metaMask } from './connectors/metaMask.js';
import store from './redux/store/store.js';
import useEagerConnect from './hooks/useEagerConnect.js';
import { Web3Provider } from "@ethersproject/providers";
Web3Provider.prototype.lookupAddress = async () => null;
Web3Provider.prototype.resolveName = async () => null;

const Web3Wrapper = ({ children }) => {
  useEagerConnect();
  return children;
};

const connectors = [
  [walletConnectV2, walletConnectV2Hooks],
  [metaMask, metaMaskHooks]
];

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider connectors={connectors}>
        <Web3Wrapper>
          <App />
        </Web3Wrapper>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>
);
