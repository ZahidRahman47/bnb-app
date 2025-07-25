// Set of helper functions to facilitate wallet setup

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
    const provider = (window).ethereum
    if (provider) {
      const chainId = 97
          // const chainId = 4
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString()}`,
              // chainName: 'Rinkeby Smart Chain TestNet',
              // nativeCurrency: {
              //   name: 'ETH',
              //   symbol: 'ETH',
              //   decimals: 18,
              // },
              // rpcUrls: [nodes],
              // blockExplorerUrls: ['https://rinkeby.etherscan.com/'],
            },
          ],
        })
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    } else {
      console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
      return false
    }
  }
  /**
   * Prompt the user to add a custom token to metamask
   * @param tokenAddress
   * @param tokenSymbol
   * @param tokenDecimals
   * @param tokenImage
   * @returns {boolean} true if the token has been added, false otherwise
   */
  export const registerToken = async (
    tokenAddress,
    tokenSymbol,
    tokenDecimals,
    tokenImage,
  ) => {
    const tokenAdded = await (window).ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    })
  
    return tokenAdded
  }