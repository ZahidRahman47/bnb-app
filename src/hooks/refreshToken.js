import { useCallback } from "react";
import { api_url } from "../utils/Enviroment";
import axios from 'axios';
import { useWeb3React } from "@web3-react/core";

const RefreshToken = () => {
let { account } = useWeb3React();
    const refreshTokenApi = useCallback(async () => {
        const token = localStorage?.getItem("refreshToken");
        try {
            const res = await axios.post(`${api_url}auth/refresh-token`, { refreshToken: token, walletAddress: account });
            localStorage.setItem("accessToken", res?.data?.accessToken)
            return res?.data?.accessToken;
        } catch (err) {
            console.error(err?.status);
        }
    }, [api_url]);
    return { refreshTokenApi };
}

export default RefreshToken;