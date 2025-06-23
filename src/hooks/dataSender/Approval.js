import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { getUsdtMethods } from "../../utils/contractHelpers";
import {
  BNB_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
} from "../../utils/Enviroment";

export const useApprove = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  let contract;
  const bigNumberApproval = "1000000000000";
  const approvee = useCallback(async () => {
    contract = await getUsdtMethods(USDT_CONTRACT_ADDRESS, web3);
    const feeAmount = web3.utils.toWei(bigNumberApproval, "ether");
    let gasPrice = await web3.eth.getGasPrice();
    gasPrice = parseInt(gasPrice);
    try {
      const gas = await contract.methods
        .approve(BNB_CONTRACT_ADDRESS, feeAmount)
        .estimateGas({ from: account });
      const transaction = await contract.methods
        .approve(BNB_CONTRACT_ADDRESS, feeAmount)
        .send({ from: account, gas: gas, gasPrice: gasPrice });
      return transaction;
    } catch (error) {
      console.error("Approval error:", error);
      throw error;
    }
  }, [account, contract, web3]);

  return approvee;
};
export default useApprove;
