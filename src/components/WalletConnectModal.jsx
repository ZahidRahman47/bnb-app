import React from "react";
import "../styles/_modal.scss";
import useWalletConnector from "./hooks/walletConnect/useWalletConnector";

const WalletConnectModal = ({ onClose }) => {
  const { handleConnect, loadingWallet } = useWalletConnector(onClose);

  return (
    <div className="modal-overlay">
      <div className="wallet-modal">
        <h2>Connect Your Wallet</h2>

        <button
          className="wallet-option"
          onClick={() => handleConnect("metamask")}
          disabled={loadingWallet !== null}
        >
          {loadingWallet === "metamask" ? "Connecting..." : "MetaMask"}
        </button>

        <button
          className="wallet-option"
          onClick={() => handleConnect("walletconnect")}
          disabled={loadingWallet !== null}
        >
          {loadingWallet === "walletconnect" ? "Connecting..." : "WalletConnect"}
        </button>

        <button
          className="close-btn"
          onClick={onClose}
          disabled={loadingWallet !== null}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletConnectModal;
