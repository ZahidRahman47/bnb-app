import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../useWeb3";
import { getBnbMethods, getUsdtMethods } from "../../utils/contractHelpers";
import { BNB_CONTRACT_ADDRESS } from "../../utils/Enviroment";

export const useSendTokens = () => {
  const web3 = useWeb3();
  const { account } = useWeb3React();

  const sendERC20 = useCallback(
    async (tokenAddress, recipient, amountRaw, feeInPPM) => {
      if (!tokenAddress || !recipient || !amountRaw || !account) {
        throw new Error("Missing required parameters");
      }

      try {
        const tokenContract = getUsdtMethods(tokenAddress, web3);
        const decimals = await tokenContract.methods.decimals().call();
        const parsedAmount = web3.utils
          .toBN(parseFloat(amountRaw) * 10 ** parseInt(decimals))
          .toString();

        const paymentContract = getBnbMethods(BNB_CONTRACT_ADDRESS, web3);

        const allowance = await tokenContract.methods
          .allowance(account, paymentContract._address)
          .call();

        const allowanceBN = web3.utils.toBN(allowance);
        const amountBN = web3.utils.toBN(parsedAmount);

        if (allowanceBN.lt(amountBN)) {
          const approveTx = await tokenContract.methods
            .approve(paymentContract._address, parsedAmount)
            .send({ from: account });

          console.log("✅ Approval successful:", approveTx);
        }

        // Send payment
        const gasPrice = await web3.eth.getGasPrice();
        const estimatedGas = await paymentContract.methods
          .sendPayment(tokenAddress, recipient, parsedAmount, feeInPPM)
          .estimateGas({ from: account });

        const tx = await paymentContract.methods
          .sendPayment(tokenAddress, recipient, parsedAmount, feeInPPM)
          .send({
            from: account,
            gas: estimatedGas,
            gasPrice,
          });

        console.log("✅ ERC20 Payment successful:", tx);
        return tx;
      } catch (error) {
        console.error("❌ ERC20 Payment failed:", error);
        throw error;
      }
    },
    [web3, account]
  );

  return { sendERC20 };
};

export default useSendTokens;
