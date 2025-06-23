import { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { getWeb3NoAccount } from "../utils/web3";

const useWeb3 = () => {
  const { provider, connector } = useWeb3React();
  const refEth = useRef(provider);
  const [web3, setweb3] = useState(
    provider ? new Web3(connector.provider) : getWeb3NoAccount()
  );


  useEffect(() => {
    if (provider !== refEth.current) {
     
      setweb3(provider ? new Web3(connector.provider) : getWeb3NoAccount());
      refEth.current = provider;

    }
  }, [provider, connector,web3]);

  return web3;
};


export default useWeb3;