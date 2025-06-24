import React, { useState } from "react";
import Header from "./components/Header";
import SendTokenForm from "./components/SendTokenForm";
import WalletConnectModal from "./components/WalletConnectModal";
import  useWalletConnection  from "./components/hooks/walletConnect/useWalletConnection"; // ✅ fixed import

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { account, disconnectWallet } = useWalletConnection();

  return (
    <div className="app">
      <Header
        account={account}
        onConnect={openModal}
        onDisconnect={disconnectWallet}
      />
      <main>
        <SendTokenForm />
      </main>
      {isModalOpen && <WalletConnectModal onClose={closeModal} />}
    </div>
  );
}

export default App;
