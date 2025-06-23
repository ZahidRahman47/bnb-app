// hooks/useSendPayment.js
import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { getBnbMethods } from "../../utils/contractHelpers";
import { BNB_CONTRACT_ADDRESS } from "../../utils/Enviroment";

const useSendPayment = () => {
  const web3 = useWeb3();
  const contract = getBnbMethods(BNB_CONTRACT_ADDRESS, web3);
  const { account } = useWeb3React();

  const sendPayment = useCallback(
    async (amount, recipient, feeinPPM) => {
      const amountInWei = web3.utils.toWei(amount?.toString(), "ether");
      const gasPrice = await web3.eth.getGasPrice();

      try {
        const gas = await contract.methods
          .sendPaymentWithNative(recipient, feeinPPM)
          .estimateGas({
            from: account,
            value: amountInWei, // ✅ use amount as msg.value here
          });

        const tx = await contract.methods
          .sendPaymentWithNative(recipient, feeinPPM)
          .send({
            from: account,
            gas,
            gasPrice,
            value: amountInWei, // ✅ send value here
          });

        return tx;
      } catch (e) {
        throw e;
      }
    },
    [contract, web3, account]
  );

  return { sendPayment };
};

export default useSendPayment;
