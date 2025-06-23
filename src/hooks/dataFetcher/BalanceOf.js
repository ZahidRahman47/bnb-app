import { useCallback } from "react";
import useWeb3 from "../useWeb3";
import { getUsdtMethods } from "../../utils/contractHelpers";
import { USDT_CONTRACT_ADDRESS } from "../../utils/Enviroment";
import { useWeb3React } from "@web3-react/core";

const Balance = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const tokenAddress = USDT_CONTRACT_ADDRESS;

    const BalanceHook = useCallback(
        async () => {
            if (!account ) {
                console.error("Invalid or missing account address.");
                return "0";
            }
            const contract = getUsdtMethods(tokenAddress, web3);
            if (!contract) {
                console.error("Contract not initialized properly.");
                return "0";
            }

            try {
                const balance = await contract?.methods?.balanceOf(account).call();
                const formattedBalance = web3.utils.fromWei(String(balance), 'ether');
                return formattedBalance;
            } catch (error) {
                console.error("Error fetching balance:", error.message || error);
                return "0";
            }
        },
        [account, web3]
    );

    return { BalanceHook };
};

export default Balance;
