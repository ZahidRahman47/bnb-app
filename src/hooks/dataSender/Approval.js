import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { getUsdtMethods } from "../../utils/contractHelpers";

export const useApprove = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();

  const approval = useCallback(
    async (tokenAddress, spenderAddress) => {
      try {
        const contract = await getUsdtMethods(tokenAddress, web3);
        const gasPrice = await web3.eth.getGasPrice();

        // ✅ Get decimals from the token contract
        const decimals = await contract.methods.decimals().call();

        // ✅ Approve for 1 million tokens (customizable), respecting decimals
        const amount = web3.utils.toBN("1000000"); // 1 million
        const multiplier = web3.utils.toBN(10).pow(web3.utils.toBN(decimals));
        const bigNumberApproval = amount.mul(multiplier); // 1,000,000 * 10^decimals

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
