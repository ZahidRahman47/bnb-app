import React, { useState } from "react";
import useSendTransaction from "./hooks/sendTransaction/useSendTransaction";
import "../styles/_form.scss";

const SendTokenForm = () => {
  const { account, balance, tokenBalance, handleSend } = useSendTransaction();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [feeInPPM, setFeeInPPM] = useState("0.00001");
  const [token, setToken] = useState("bnb");

  const onSubmit = () => {
    handleSend({ recipient, amount, feeInPPM, token });
  };

  return (
    <div className="send-token-form">
      <h2>Send BNB / Token</h2>
      {account && (
  <p>
    User Balance:{" "}
    {token === "bnb"
      ? `${balance} BNB`
      : `$${tokenBalance} ${token.toUpperCase()}`}
  </p>
)}

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
      <button className="send-btn" onClick={onSubmit}>
        Send
      </button>
    </div>
  );
};

export default SendTokenForm;
