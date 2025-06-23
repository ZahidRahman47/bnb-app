import React, { useState } from "react";
import "../styles/_modal.scss";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../hooks/useAuth";

const WalletConnectModal = ({ onClose }) => {
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  const [loader, setLoader] = useState(false);

  const connectMetaMask = async () => {
    try {
      if (account) {
        const connectorId = window.localStorage.getItem("connectorId");
        await logout(connectorId);
        localStorage.clear();
      } else {
        await login("injected");
        localStorage.setItem("connectorId", "injected");
        localStorage.setItem("flag", "true");
        onClose(); // close modal
      }
    } catch (error) {
      console.error("MetaMask connection error:", error);
      localStorage.clear();
    }
  };

  const connectWalletConnect = async () => {
    try {
      if (account) {
        await logout("walletconnect");
        localStorage.clear();
      } else {
        setLoader(true);
        await login("walletconnect");
        localStorage.setItem("connectorId", "walletconnect");
        localStorage.setItem("flag", "true");
        setLoader(false);
        onClose(); // close modal
      }
    } catch (error) {
      setLoader(false);
      console.error("WalletConnect connection error:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="wallet-modal">
        <h2>Connect Your Wallet</h2>

        <button className="wallet-option" onClick={connectMetaMask}>
          {loader ? "Connecting..." : "MetaMask"}
        </button>

        <button className="wallet-option" onClick={connectWalletConnect}>
          {loader ? "Connecting..." : "WalletConnect"}
        </button>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletConnectModal;
