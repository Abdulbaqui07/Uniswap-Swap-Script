const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


const UNISWAP_ROUTER_ABI = require("./abi/UNISWAP_ROUTER_ABI.json");
const USDC_ABI = require("./abi/USDC_ABI.json");
const WETH_ABI = require("./abi/WETH_ABI.json");
const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const amountToSend = web3.utils.toWei("1", "ether");

const to = "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0";
const to_private_key = "0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1";

const ETHAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

// async function swapETHtoUSDC() {

// console.log(UniswapRouter.methods);

//     //Get the amount of ETH to send
//     console.log("Amount to Send: ", amountToSend)

//     //Call the swapExactETHForTokens function on the Uniswap Router contract
//     const result = await UniswapRouter.methods.swapExactETHForTokens(10000, [WETHAddress, USDCAddress], to, 1975180525).send({
//         from: to,
//         value: amountToSend,
//         gasPrice: "20000000000", // 20 GWEI
//         gas: "300000"
//     });

//     console.log("Transaction Hash:", result);
//     console.log("Transaction Hash:", result.transactionHash);
// }

/**
 * @dev to perform swap from eth to usdc token
 */
async function SendEthToUSDC() {

    // USDCContract instance
    const USDCcontract = new web3.eth.Contract(USDC_ABI, USDCAddress)

    // UNiswap router instance
    const UniswapRouter = new web3.eth.Contract(UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS);

    // getting balance of eth 
    let balance = await web3.eth.getBalance(to);
    console.log("Balance of ETH of ", to, " before txn ", balance)

    // getting balance of USDC
    let balanceOF = await USDCcontract.methods.balanceOf(to).call();
    console.log("Before txn, amount of USDC ", balanceOF)

    // Creating function abi encode data
    let ethTOUSDC = await UniswapRouter.methods.swapExactETHForTokens(10000, [WETHAddress, USDCAddress], to, 1975180525).encodeABI();

    // console.log("data", ethTOUSDC)

    // tx object
    let tx = {
        from: to,
        to: UNISWAP_ROUTER_ADDRESS,
        gas: 300000,
        data: ethTOUSDC,
        value: amountToSend
    }

    console.log("tx : ", tx);

    // signing txn with private key
    let signedTx = await web3.eth.accounts.signTransaction(tx, to_private_key)
    // console.log("signed tx", signedTx.rawTransaction);

    // sending the signed txn
    let sendTransaction = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log("send transaction hash ", sendTransaction.transactionHash)

    // getting the balance of USDC
    let balanceOF2 = await USDCcontract.methods.balanceOf(to).call();
    console.log("After txn, amount of USDC", balanceOF2)
    
    // getting the balance of ETH
    let balance2 = await web3.eth.getBalance(to);
    console.log("Balance of ETH of ", to, " after txn ", balance2)

}

/**
 * @dev to perform swap from usdc to eth 
 */
async function sendUsdcToEth() {
    // USDCContract instance
    const USDCcontract = new web3.eth.Contract(USDC_ABI, USDCAddress)

    // WETH instance
    const WETHcontract = new web3.eth.Contract(WETH_ABI, WETHAddress)

    // Uniswap router instance 
    const UniswapRouter = new web3.eth.Contract(UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS);

    // getting balance of USDC
    let balanceOfUSDC = await USDCcontract.methods.balanceOf(to).call();
    console.log("Balance of USDC of ", to, " before txn ", balanceOfUSDC)

    // getting balance of ETH
    let balance = await web3.eth.getBalance(to);
    console.log("Balance of ETH of ", to, " before txn ", balance)

    // // getting balance of WETH
    // let balanceOfWeth = await WETHcontract.methods.balanceOf(to).call()
    // console.log("Balance of WETH of ", to, " before txn ", balanceOfWeth)

    // generating abi encode data of function 
    let USDCToETh = await UniswapRouter.methods.swapExactTokensForETH(100000000, 100000, [USDCAddress, WETHAddress], to, 1975180525).encodeABI();

    // approving to uniswap before txn
    let Approve = await USDCcontract.methods.approve(UNISWAP_ROUTER_ADDRESS, 1000000000).send({ from: to })
    console.log("approve tx hash ", Approve.transactionHash)

    // getting the amount approved to uniswap from user
    let value = await USDCcontract.methods.allowance(to, UNISWAP_ROUTER_ADDRESS).call();
    console.log("allownace to contract is ", value)

    // tx object 
    let tx = {
        from: to,
        to: UNISWAP_ROUTER_ADDRESS,
        gas: 300000,
        data: USDCToETh,
        // value: amountToSend
    }

    console.log("tx : ", tx);

    // signing txn object
    let signedTx = await web3.eth.accounts.signTransaction(tx, to_private_key)
    // console.log("signed tx", signedTx.rawTransaction);

    // sending txn to blockchain
    let sendTransaction = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log("send transaction hash ", sendTransaction.transactionHash)

    // getting balance of usdc
    let balanceOfUSDC2 = await USDCcontract.methods.balanceOf(to).call();
    console.log("Balance of USDC of ", to, " after txn ", balanceOfUSDC2)
    
    // // getting balance of weth 
    // let balanceOfWeth2 = await WETHcontract.methods.balanceOf(to).call()
    // console.log("Balance of WETH of ", to, " after txn ", balanceOfWeth2)

    // getting balance of eth
    let balance2 = await web3.eth.getBalance(to);
    console.log("Balance of ETH of ", to, " after txn ", balance2)
}

// SendEthToUSDC()
sendUsdcToEth()