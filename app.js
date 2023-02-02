// const Web3 = require("web3");
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// const UNISWAP_ROUTER_ABI = require("./abi/UNISWAP_ROUTER_ABI.json");
// const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

// async function swapTokenToToken(fromTokenAddress, toTokenAddress, amount) {
//     const UniswapRouter = new web3.eth.Contract(UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS);

//     // Get the amount of the `toTokenAddress` to receive
//     const amountToReceive = web3.utils.toWei(amount, "ether");

//     // Call the swapExactTokensForTokens function on the Uniswap Router contract
//     const result = await UniswapRouter.methods.swapExactTokensForTokens("2", "1", [], "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0", "0").send({
//         from: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
//         gasPrice: "20000000000", // 20 GWEI
//         gas: "300000"
//     });
//     console.log("Transaction Hash:", result.transactionHash);
// }

// swapTokenToToken("FROM_TOKEN_ADDRESS", "TO_TOKEN_ADDRESS", "1");

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const UNISWAP_ROUTER_ABI = require("./abi/UNISWAP_ROUTER_ABI.json");
const USDC_ABI = require("./abi/USDC_ABI.json");
const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const amountToSend = web3.utils.toWei("1", "ether");
const to = "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0";
const to_private_key = "0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1";
const UniswapRouter = new web3.eth.Contract(UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS);
const ETHAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

// async function swapETHtoUSDC() {

//     // console.log(UniswapRouter.methods);

//     // Get the amount of ETH to send
// //     console.log("Amount to Send: ", amountToSend)

//     // Call the swapExactETHForTokens function on the Uniswap Router contract
//     const result = await UniswapRouter.methods.swapExactETHForTokens(10000, [WETHAddress, USDCAddress], to, 1975180525).send({
//         from: to,
//         value: amountToSend,
//         gasPrice: "20000000000", // 20 GWEI
//         gas: "300000"
//     });

//     console.log("Transaction Hash:", result);
// //     console.log("Transaction Hash:", result.transactionHash);
// }

async function encodeAndSend(){

    // USDCContract instance
    const USDCcontract = new web3.eth.Contract(USDC_ABI, USDCAddress)

    let balanceOF = await USDCcontract.methods.balanceOf(to).call();
    console.log("Before txn, amount of USDC ",balanceOF)

    let ethTOUSDC = await UniswapRouter.methods.swapExactETHForTokens(10000, [WETHAddress, USDCAddress], to, 1975180525).encodeABI();
    // let USDCToETh = await UniswapRouter.methods.swapExactTokensForETH(1000000000, 100000, [USDCAddress, WETHAddress], to)
    // console.log("data", data)

    let tx = {
        from: to,
        to: UNISWAP_ROUTER_ADDRESS,
        gas: 300000,
        data: data,
        value: amountToSend
    }

    console.log("tx : ",tx);

    let signedTx = await web3.eth.accounts.signTransaction(tx, to_private_key)
    // console.log("signed tx", signedTx.rawTransaction);

    let sendTransaction = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log("send transaction hash ",sendTransaction.transactionHash)


    let balanceOF2 = await USDCcontract.methods.balanceOf(to).call();
    console.log("After txn, amount of USDC",balanceOF2)

    
}
encodeAndSend()