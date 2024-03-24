const { ethers } = require("ethers");
const factoryABI = require('./ABI/factory.js')
const poolABI = require('./ABI/pool.js')


async function Sushi() {
    const url = "https://mainnet.infura.io/v3/575df068ef554f19aa933b197f194cde"
    const provider = new ethers.JsonRpcProvider(url);

    const wbtcEndereco = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
    const usdcEndereco = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const ethEndereco = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    const factoryEndereco = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac"
 
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

module.exports = Sushi