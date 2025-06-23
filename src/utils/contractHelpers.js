import UsdtABI from "../utils/UsdtABI.json";
import BnbABI from "../utils/BnbABI.json";
import web3NoAccount from "./web3";

const getContract = (abi, address, web3) => {
  const _web3 = web3 ?? web3NoAccount;
  return new _web3.eth.Contract(abi, address);
};

export const getUsdtMethods = (address, web3) => {
  return getContract(UsdtABI, address, web3);
};

export const getBnbMethods = (address, web3) => {
  return getContract(BnbABI, address, web3);
};





//getLiquidityPool => getBnbMethods
//getBalance => getUsdtMethods