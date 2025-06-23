import React from "react";
import "../styles/_form.scss";

const SendTokenForm = () => {
  return (
    <div className="send-token-form">
      <h2>Send BNB / Token</h2>
      <input type="text" placeholder="Recipient Address" />
      <input type="number" placeholder="Amount" />
      <div className="other-token-div">
      <select>
        <option value="bnb">BNB</option>
        <option value="token">Usdt</option>
        <option value="token">Eth</option>


      </select>
      </div>
      <button className="send-btn">Send</button>
    </div>
  );
};

export default SendTokenForm;
