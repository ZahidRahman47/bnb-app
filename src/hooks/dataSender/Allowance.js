// hooks/dataSender/Allowance.js
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { getUsdtMethods } from "../../utils/contractHelpers";
import { BNB_CONTRACT_ADDRESS } from "../../utils/Enviroment";

export const useCheckAllowance = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const spenderAddress = BNB_CONTRACT_ADDRESS;

  const checkAllowance = useCallback(
    async (tokenAddress) => {
      try {
        const contract = await getUsdtMethods(tokenAddress, web3);
        const allowance = await contract.methods
          .allowance(account, spenderAddress)
          .call();

        // Convert from smallest unit (wei) to human-readable format
        const formatted = web3.utils.fromWei(String(allowance), "ether");

        return parseFloat(formatted); // ✅ Return actual number, not boolean
      } catch (error) {
        console.error("Check Allowance error:", error);
        return 0; // ❌ default to 0 in error case
      }
    },
    [account, web3]
  );

  return {
    checkAllowance,
  };
};

