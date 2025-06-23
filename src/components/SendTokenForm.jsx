import React, { useEffect, useState } from "react";
import useSendPayment from "../hooks/dataSender/SendPayment"; // Adjust path
import BalanceHook from "../hooks/dataFetcher/BalanceOf";
import "../styles/_form.scss";
import useWeb3 from "../hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";

const SendTokenForm = () => {
  const { sendPayment } = useSendPayment();
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("bnb");
  const [feeInPPM, setFeeInPPM] = useState("0.00001"); // optional field
  const [balance, setBalance] = useState("0");

  // fetch user balance from contract

  useEffect(() => {
    const loadBalance = async () => {
      try {
        if (account) {
          const rawBalance = await web3.eth.getBalance(account);
          console.log( rawBalance)
          const formatted = web3.utils.fromWei(rawBalance, "ether");
          setBalance(formatted);
        }
      } catch (error) {
        console.error("❌ Error loading balance:", error.message || error);
      }
    };
    account && loadBalance();
  }, [account, web3]);
  
  const handleSend = async () => {
    console.log('funcion called')
    if (!recipient || !amount) {
      alert("Please enter recipient and amount.");
      return;
    }

    if (token === "bnb") {
      try {
        const feeInPPMInteger = Math.floor(parseFloat(feeInPPM) * 1_000_000);

        const tx = await sendPayment(amount, recipient, feeInPPMInteger);
        console.log("✅ Transaction successful:", tx);
        alert("Payment sent!");
      } catch (error) {
        console.error("❌ Payment failed:", error);
        // alert("Transaction failed." ,error);
      }
    } else {
      console.log("⚠️ Token sending not implemented yet.");
    }
  };

  return (
    <div className="send-token-form">
      <h2>Send BNB / Token</h2>
      <p>user balance:${balance} </p>
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
          <option value="eth">ETH</option>
        </select>
      </div>
      <button className="send-btn" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default SendTokenForm;
