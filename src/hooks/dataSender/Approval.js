// hooks/dataSender/Approval.js
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { getUsdtMethods } from "../../utils/contractHelpers";

export const useApprove = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();

  const bigNumberApproval = web3.utils.toWei("1000000000", "ether");

  const approval = useCallback(
    async (tokenAddress, spenderAddress) => {
      try {
        const contract = await getUsdtMethods(tokenAddress, web3);
        const gasPrice = await web3.eth.getGasPrice();

        const gas = await contract.methods
          .approve(spenderAddress, bigNumberApproval)
          .estimateGas({ from: account });

        const tx = await contract.methods
          .approve(spenderAddress, bigNumberApproval)
          .send({ from: account, gas, gasPrice });

        console.log("✅ Approval successful:", tx);
        return true;
      } catch (error) {
        console.error("❌ Approval error:", error);
        return false;
      }
    },
    [account, web3]
  );

  return { approval };
};
