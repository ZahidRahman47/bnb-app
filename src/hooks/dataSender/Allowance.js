import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { getUsdtMethods } from "../../utils/contractHelpers";
import {
  USDT_CONTRACT_ADDRESS,
  BNB_CONTRACT_ADDRESS
} from "../../utils/Enviroment";

export const useCheckAllowance = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  let contract;

  const checkAllowance = useCallback(async () => {
    try {
      contract = await getUsdtMethods(USDT_CONTRACT_ADDRESS, web3);
      const allowance = await contract.methods
        .allowance(account, BNB_CONTRACT_ADDRESS)
        .call();
      const formattedAllowance = web3.utils.fromWei(String(allowance), "ether");
      return formattedAllowance;
    } catch (error) {
      console.error("Check Allowance error:", error);
      throw error;
    }
  }, [account, contract, web3]);
  return {
    checkAllowance,
  };
};
