import { connectorsByName } from "../utils/web3React";

const useAuth = () => {
  const login = async (connectorID) => {
    const connector = connectorsByName[connectorID];
    if (connector) {
      if (connectorID === "injected") {
        await connector.activate(97);
      } else {
        await connector.activate();
      }
    } else {
      console.log("Connector not found");
    }
  };

  const logout = async (connectorID) => {
    const connector = connectorsByName[connectorID];
    if (connector) {
      if (connector?.deactivate) {
        const response = await connector.deactivate();
      } else {
        await connector.resetState();
      }
    } else {
    }
  };

  return { login, logout };
};

export default useAuth;
