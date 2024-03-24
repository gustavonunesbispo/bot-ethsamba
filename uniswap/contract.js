const { Web3 } = require('web3');
const PriceOracleABI = require('./ABI/PriceOracleABI.js'); // Substitua pelo ABI do seu contrato
const contractAddress = '0xE4CF40158EAF0e5b77CbE94912364eB1c32F1294'; // Substitua pelo endereço do seu contrato

const Uniswap = require('./uniswap.js');
const Sushi = require('./sushi.js');
const Quickswap = require('./quickswap.js');

const web3 = new Web3('https://minnet.infura.io/v3/575df068ef554f19aa933b197f194cde');

const priceOracleContract = new web3.eth.Contract(PriceOracleABI, contractAddress);

async function main() {
    const wbtcPriceUniswap = await Uniswap();
    console.log("O preço do WBTC Uniswap é:", wbtcPriceUniswap);

    const wbtcPriceSushi = await Sushi();
    console.log("O preço do WBTC Sushi é:", wbtcPriceSushi);

    const wbtcPriceQuickswap = await Quickswap();
    console.log("O preço do WBTC Quickswap é:", wbtcPriceQuickswap);

    const initialPrice = await calculateInitialPrice(wbtcPriceUniswap, wbtcPriceSushi, wbtcPriceQuickswap);
    console.log("Preço inicial:", initialPrice);

    // Atualiza o preço no contrato PriceOracle
    await updatePrice(initialPrice);
}

async function calculateInitialPrice(wbtcPriceUniswap, wbtcPriceSushi, wbtcPriceQuickswap) {
    const averagePrice = (wbtcPriceUniswap + wbtcPriceSushi + wbtcPriceQuickswap) / 3;
    return averagePrice;
}

async function updatePrice(newPrice) {
    // Obtém a conta do proprietário
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];

    // Chama a função updatePrice do contrato PriceOracle
    await priceOracleContract.methods.updatePrice(newPrice).send({ from: owner });

    console.log("Preço atualizado no contrato PriceOracle.");
}

setInterval(main, 12000);
