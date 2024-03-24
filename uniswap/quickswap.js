const { ethers } = require("ethers");
const factoryABI = require('./ABI/factory.js')
const poolABI = require('./ABI/pool.js')

async function Quickswap() {
    const url = "https://polygon-mainnet.infura.io/v3/575df068ef554f19aa933b197f194cde"
    const provider = new ethers.JsonRpcProvider(url);

    const wbtcEndereco = "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6";
    const usdcEndereco = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
    const ethEndereco = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
    const factoryEndereco = "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32"
 
    const factoryContract = new ethers.Contract(factoryEndereco, factoryABI, provider);
   
    const poolWbtcToEthEndereco = await factoryContract.getPair(wbtcEndereco, ethEndereco)

    const poolEthToUsdcEndereco = await factoryContract.getPair(ethEndereco, usdcEndereco)

    const poolWbtcEthContract = new ethers.Contract(poolWbtcToEthEndereco, poolABI, provider);
    const poolEthUsdcContract = new ethers.Contract(poolEthToUsdcEndereco, poolABI, provider);

    const [reservaUSDC, reservaETH, ] = await poolEthUsdcContract.getReserves()

    const reservaUSDCNumero = parseFloat(ethers.formatUnits(reservaUSDC, 6));
    const reservaETHNumero = parseFloat(ethers.formatUnits(reservaETH, 18));

    const priceWETHUSDC = reservaUSDCNumero / reservaETHNumero;

    const [reservaWBTC, reservaETHWbtc ] = await poolWbtcEthContract.getReserves()
    const reservaETHWbtcNumero = parseFloat(ethers.formatUnits(reservaETHWbtc, 18));
    const reservaWBTCNumero = parseFloat(ethers.formatUnits(reservaWBTC, 8));
    const priceWBTCEHT = reservaETHWbtcNumero / reservaWBTCNumero;

    const wbtcPrice = priceWETHUSDC * priceWBTCEHT


    // console.log(priceWETHUSDC, priceWBTCEHT, wbtcPrice)

    return wbtcPrice
}

module.exports = Quickswap