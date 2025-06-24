import React, { useEffect, useState } from "react";
import useSendPayment from "../hooks/dataSender/SendPayment"; // Adjust path
import BalanceHook from "../hooks/dataFetcher/BalanceOf";
import "../styles/_form.scss";
import useWeb3 from "../hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";
import useSendERC20Payment from "../hooks/dataSender/SendTokens";
import {useCheckAllowance} from "../hooks/dataSender/Allowance";
import useApprove from "../hooks/dataSender/Approval";
const SendTokenForm = () => {
  const { sendPayment } = useSendPayment();
  const { sendERC20 } = useSendERC20Payment();
  const { account } = useWeb3React();
 const {checkAllowance} = useCheckAllowance();
 const {approval} = useApprove();
  const web3 = useWeb3();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("bnb");
  const [feeInPPM, setFeeInPPM] = useState("0.00001"); // optional field
  const [balance, setBalance] = useState("0");

  // fetch user balance from contract
  const getTokenContractAddress = (symbol) => {
    switch (symbol.toLowerCase()) {
      case "usdt":
        return "0x..."; // Replace with USDT contract address
      case "eth":
        return "0x..."; // Replace with WETH or ETH token if applicable
      case "mtk":
        return "0xA8Bb8a76bc177b49aD1C20c088385B7Fe6270B4B"; // MTK token address
      default:
        throw new Error("Unknown token selected");
    }
  };
  
  useEffect(() => {
    const loadBalance = async () => {
      try {
        if (account) {
          const rawBalance = await web3.eth.getBalance(account);
          console.log(rawBalance)
          const raw = web3.utils.fromWei(rawBalance, "ether");
const formatted = isNaN(raw) ? "0.00" : parseFloat(raw).toFixed(6);
setBalance(formatted);
          setBalance(formatted);
        } else {
          // Clear the balance if account is disconnected
          setBalance("0");
        }
      } catch (error) {
        console.error("❌ Error loading balance:", error.message || error);
        setBalance("0"); // Optional: Clear on error too
      }
    };
  
    loadBalance();
  }, [account, web3]);
  
  const handleSend = async () => {
    if (!recipient || !amount) {
      alert("Please enter recipient and amount.");
      return;
    }
  
    const feeInPPMInteger = Math.floor(parseFloat(feeInPPM) * 1_000_000);
  
    if (token === "bnb") {
      try {
        const tx = await sendPayment(recipient, amount, feeInPPMInteger); // ✅ Correct order
        console.log("✅ BNB Transaction successful:", tx);
        alert("BNB Payment sent!");
      } catch (error) {
        console.error("❌ BNB Payment failed:", error);
      }
    } else {
      try {
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
          alert("Invalid amount entered.");
          return;
        }
  
        const tokenAmount = web3.utils.toBN(Math.floor(parsedAmount * 1e6)).toString(); // 6 decimals
  
        const tokenContractAddress = getTokenContractAddress(token);
  
        const allowance = await checkAllowance(tokenContractAddress);
        
        if (parseFloat(allowance) < parseFloat(amount)) {
          const approve = await approval(tokenContractAddress, amount);
          if (approve) {
            const tx = await sendERC20(tokenContractAddress, recipient, amount, feeInPPMInteger);
            alert(`${token.toUpperCase()} Payment sent!`);
          } else {
            alert("Approval failed");
          }
        } else {
          console.log(tokenContractAddress, recipient, amount, feeInPPMInteger)
          const tx = await sendERC20(tokenContractAddress, recipient, amount, feeInPPMInteger);
          alert(`${token.toUpperCase()} Payment sent!`);
        }
        
        alert(`${token.toUpperCase()} Payment sent!`);
      } catch (error) {
        console.error("❌ ERC20 Payment failed:", error);
        alert("Transaction failed. See console for details.");
      }
    }
  };
  
  
  

  return (
    <div className="send-token-form">
      <h2>Send BNB / Token</h2>
      <p>user balance: {account ? `$${balance}` :0}</p>

      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Fee (PPM)"
        value={feeInPPM}
        onChange={(e) => setFeeInPPM(e.target.value)}
      />
      <div className="other-token-div">
        <select value={token} onChange={(e) => setToken(e.target.value)}>
          <option value="bnb">BNB</option>
          <option value="usdt">USDT</option>
          <option value="mtk">MTK</option>
        </select>
      </div>
      <button className="send-btn" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default SendTokenForm;
