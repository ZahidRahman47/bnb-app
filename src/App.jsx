// App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import SendTokenForm from "./components/SendTokenForm";
import WalletConnectModal from "./components/WalletConnectModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app">
      <Header onConnectClick={openModal} />
      <main>
        <SendTokenForm />
      </main>
      {isModalOpen && <WalletConnectModal onClose={closeModal} />}
    </div>
  );
}

export default App;
