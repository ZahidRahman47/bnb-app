import React from "react";
import "../styles/_header.scss";

const Header = ({ account, onConnect, onDisconnect }) => {
  return (
    <header className="header">
      {account ? (
        <button className="connect-btn" onClick={onDisconnect}>
          Disconnect Wallet
        </button>
      ) : (
        <button className="connect-btn" onClick={onConnect}>
          Connect Wallet
        </button>
      )}
      <p>Connected Account: {account || "Not connected"}</p>
    </header>
  );
};

export default Header;
