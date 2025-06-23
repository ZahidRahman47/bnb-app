
import { Web3Provider } from "@ethersproject/providers";
import { walletConnectV2 } from "../connectors/walletConnetV2";
import { metaMask } from "../connectors/metaMask"

const ConnectorNames = {
    Injected: "injected",
    WalletConnect: "walletconnect",
    // WalletConnect1:"walletconnect1"
}

export const connectorsByName = {
    [ConnectorNames.Injected]: metaMask,
    [ConnectorNames.WalletConnect]: walletConnectV2,
    // [ConnectorNames.WalletConnect1]: walletConnectV3
}

export const getLibraryForSign = (provider) => {
    const library = new Web3Provider(provider);
    return library
}

export const getLibrary = (provider) => {
    return provider
}