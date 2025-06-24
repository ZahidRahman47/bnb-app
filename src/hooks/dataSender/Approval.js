// hooks/dataSender/Approval.js
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { getUsdtMethods } from "../../utils/contractHelpers"; // Rename this to getERC20Contract if it's generic
import { BNB_CONTRACT_ADDRESS, USDT_CONTRACT_ADDRESS } from "../../utils/Enviroment";

export const useApprove = () => {
  console.log('inside approved hook')
  const { account } = useWeb3React();
  const web3 = useWeb3();

  const bigNumberApproval = web3.utils.toWei("1000000000", "ether");

  const approval = useCallback(async () => {
    const contract = await getUsdtMethods(USDT_CONTRACT_ADDRESS, web3);
    const gasPrice = await web3.eth.getGasPrice();
  
    try {
      const gas = await contract.methods
        .approve(BNB_CONTRACT_ADDRESS, bigNumberApproval)
        .estimateGas({ from: account });
  
      const transaction = await contract.methods
        .approve(BNB_CONTRACT_ADDRESS, bigNumberApproval)
        .send({ from: account, gas, gasPrice });
   console.log(transaction)
      return transaction;
    } catch (error) {
      console.error("Approval error:", error);
      throw error;
    }
  }, [account, web3]);
  
  return { approval };
};

export default useApprove;
