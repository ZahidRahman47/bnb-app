import { useWeb3React } from "@web3-react/core";
import useAuth from "../../../hooks/useAuth";

const useWalletConnection = () => {
  const { account } = useWeb3React();
  const { logout } = useAuth();

  const disconnectWallet = async () => {
    const connectorId = window?.localStorage?.getItem("connectorId");
    await logout(connectorId);
    localStorage.removeItem("connectorId");
    localStorage.removeItem("flag");
  };

  return {
    account,
    disconnectWallet,
  };
};

export default useWalletConnection;
