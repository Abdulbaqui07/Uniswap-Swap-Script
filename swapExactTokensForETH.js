const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("YOUR_HTTP_PROVIDER_URL"));

async function swapUSDCtoETH() {
  const UniswapRouter = new web3.eth.Contract(UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS);
  const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const ETHAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  // Get the amount of ETH to receive
  const amountToReceive = web3.utils.toWei("1", "ether");

  // Call the swapExactTokensForETH function on the Uniswap Router contract
  const result = await UniswapRouter.methods.swapExactTokensForETH(amountToReceive, [USDCAddress, ETHAddress], "0", "0", "0").send({
    from: "YOUR_ACCOUNT_ADDRESS",
    gasPrice: "20000000000", // 20 GWEI
    gas: "300000"
  });

  console.log("Transaction Hash:", result.transactionHash);
}

swapUSDCtoETH();