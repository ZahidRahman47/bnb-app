import React from "react";
import "../styles/_header.scss";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../hooks/useAuth";
// import logo from "../../public/logo192.png";

const Header = ({ onConnectClick }) => {
  const { account } = useWeb3React();
  const { login, logout } = useAuth();

  const disconnectWallet = async () => {
    const connectorId = window?.localStorage?.getItem("connectorId");
    logout(connectorId);
    localStorage.removeItem("connectorId");
    localStorage.removeItem("flag");
  };
  return (
    <header className="header">
      {/* <img src={logo} alt="Logo" className="logo" /> */}

     {account?  <button className="connect-btn" onClick={disconnectWallet}>
        Disconnect Wallet
      </button> :   <button className="connect-btn" onClick={onConnectClick}>
        Connect Wallet
      </button>}
     <p>
       Connected Account :{account}
       </p>
    </header>
  );
};

export default Header;
