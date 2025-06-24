import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../../hooks/useAuth";

const useWalletConnector = (onClose) => {
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  const [loadingWallet, setLoadingWallet] = useState(null); // "metamask" | "walletconnect" | null

  const storageKeys = {
    connectorId: "connectorId",
    flag: "flag",
  };

  const clearWalletStorage = () => {
    localStorage.removeItem(storageKeys.connectorId);
    localStorage.removeItem(storageKeys.flag);
  };

  const handleConnect = async (type) => {
    setLoadingWallet(type);
    const connector = type === "metamask" ? "injected" : "walletconnect";

    try {
      if (account) {
        await logout(connector);
        clearWalletStorage();
      } else {
        await login(connector);
        localStorage.setItem(storageKeys.connectorId, connector);
        localStorage.setItem(storageKeys.flag, "true");
        onClose(); // close modal
      }
    } catch (error) {
      console.error(`${type} connection error:`, error);
      clearWalletStorage();
    } finally {
      setLoadingWallet(null);
    }
  };

  return {
    handleConnect,
    loadingWallet,
  };
};

export default useWalletConnector;
