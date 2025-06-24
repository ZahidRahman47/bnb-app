// hooks/sendTransaction/useSendTransaction.js
import { useState, useEffect, useCallback } from "react";
import useSendPayment from "../../../hooks/dataSender/SendPayment";
import {useSendTokens} from "../../../hooks/dataSender/SendTokens";
import {useApprove} from "../../../hooks/dataSender/Approval";
import { useCheckAllowance } from "../../../hooks/dataSender/Allowance";
import Balance from "../../../hooks/dataFetcher/BalanceOf";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "../../../hooks/useWeb3";
import { BNB_CONTRACT_ADDRESS } from "../../../utils/Enviroment";
import { getTokenContractAddress } from "../../../utils/helpers"; // adjust path as needed


const useSendTransaction = () => {
  const { account } = useWeb3React();
  const { sendPayment } = useSendPayment();
  const { sendERC20 } = useSendTokens();
  const { checkAllowance } = useCheckAllowance();
  const { approval } = useApprove();
  const { BalanceHook } = Balance();
  const web3 = useWeb3();

  const [balance, setBalance] = useState("0");
  const [tokenBalance, setTokenBalance] = useState("0");

  

  const loadBalance = useCallback(async () => {
    try {
      if (!account) return;

      const tokenBal = await BalanceHook();
      setTokenBalance(parseFloat(tokenBal).toFixed(2));

      const rawBalance = await web3.eth.getBalance(account);
      const eth = parseFloat(web3.utils.fromWei(rawBalance, "ether")).toFixed(6);
      setBalance(isNaN(eth) ? "0.00" : eth);
    } catch (err) {
      console.error("❌ Error loading balance:", err);
      setBalance("0");
      setTokenBalance("0");
    }
  }, [account, web3, BalanceHook]);

  useEffect(() => {
    loadBalance(); 
  }, [loadBalance]);

  const handleSend = async ({ recipient, amount, feeInPPM, token }) => {
    const feeInPPMInteger = Math.floor(parseFloat(feeInPPM) * 1_000_000);
    const parsedAmount = parseFloat(amount);
  
    if (!recipient || !amount || isNaN(parsedAmount)) {
      alert("Invalid input fields");
      return;
    }
  
    if (token === "bnb") {
      try {
        await sendPayment(recipient, amount, feeInPPMInteger);
        alert("BNB Payment sent!");
        await loadBalance();
      } catch (err) {
        console.error("❌ BNB Payment failed:", err);
        alert("BNB Transaction failed");
      }
    } else {
      try {
        const tokenContractAddress = getTokenContractAddress(token);
        const allowance = await checkAllowance(tokenContractAddress);
  
        if (parseFloat(allowance) < parsedAmount) {
          const isApproved = await approval(tokenContractAddress, BNB_CONTRACT_ADDRESS);
          if (!isApproved) {
            alert("Approval failed");
            return;
          }
        }
  
        await sendERC20(tokenContractAddress, recipient, amount, feeInPPMInteger);
        alert(`${token.toUpperCase()} Payment sent!`);
        await loadBalance();
      } catch (err) {
        console.error("❌ ERC20 Payment failed:", err);
        alert("ERC20 Transaction failed");
      }
    }
  };
  

  return {
    account,
    balance,
    tokenBalance,
    handleSend,
  };
};

export default useSendTransaction;
