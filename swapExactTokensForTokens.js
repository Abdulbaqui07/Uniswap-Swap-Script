const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/a6cb9ec392304a8990d3dbd8502adbf6"));

async function swapTokenToToken(fromTokenAddress, toTokenAddress, amount) {
  const UniswapRouter = new web3.eth.Contract(UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS);

  // Get the amount of the `toTokenAddress` to receive
  const amountToReceive = web3.utils.toWei(amount, "ether");

  // Call the swapExactTokensForTokens function on the Uniswap Router contract
  const result = await UniswapRouter.methods.swapExactTokensForTokens(amountToReceive, [fromTokenAddress, toTokenAddress], "0", "0", "0").send({
    from: "YOUR_ACCOUNT_ADDRESS",
    gasPrice: "20000000000", // 20 GWEI
    gas: "300000"
  });

  console.log("Transaction Hash:", result.transactionHash);
}

swapTokenToToken("FROM_TOKEN_ADDRESS", "TO_TOKEN_ADDRESS", "1");
// const Web3 = require("web3");
// const web3 = new Web3(new Web3.providers.HttpProvider("YOUR_HTTP_PROVIDER_URL"));

// async function swapTokenToToken(fromTokenAddress, toTokenAddress, amount) {
//   const UniswapRouter = new web3.eth.Contract(UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS);

//   // Get the amount of the `toTokenAddress` to receive
//   const amountToReceive = web3.utils.toWei(amount, "ether");

//   // Call the swapExactTokensForTokens function on the Uniswap Router contract
//   const result = await UniswapRouter.methods.swapExactTokensForTokens(amountToReceive, [fromTokenAddress, toTokenAddress], "0", "0", "0").send({
//     from: "YOUR_ACCOUNT_ADDRESS",
//     gasPrice: "20000000000", // 20 GWEI
//     gas: "300000"
//   });

//   console.log("Transaction Hash:", result.transactionHash);
// }

// swapTokenToToken("FROM_TOKEN_ADDRESS", "TO_TOKEN_ADDRESS", "1");