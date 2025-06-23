import { useWeb3React } from "@web3-react/core";
import { getLibraryForSign } from "../utils/web3React";
import { useEffect, useState } from "react";
import { connectorsByName } from "../utils/web3React";

const useLibrary = () => {
    const { account, library } = useWeb3React();
    const [selectedLibrary, setSelectedLibrary] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const connectorId = window.localStorage.getItem("connectorId");

            let libraryToUse = null;

            if (connectorId === "injected" && account && library?.provider) {
                libraryToUse = getLibraryForSign(library.provider);
            } else if (connectorId !== "injected" && connectorsByName.walletconnect.provider) {
                libraryToUse = getLibraryForSign(connectorsByName.walletconnect.provider);
            }
            setSelectedLibrary(libraryToUse);
        }
    }, [account, library]);

    return { selectedLibrary };
};

export default useLibrary;
