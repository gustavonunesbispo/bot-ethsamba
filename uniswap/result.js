const Uniswap = require('./uniswap.js');
const Sushi = require('./sushi.js');
const Quickswap = require('./quickswap.js');


async function main() {
    const wbtcPriceUniswap = await Uniswap();
    console.log("O preço do WBTC Uniswap é:", wbtcPriceUniswap);

    const wbtcPriceSushi = await Sushi();
    console.log("O preço do WBTC Sushi é:", wbtcPriceSushi);

    const wbtcPriceQuickswap = await Quickswap();
    console.log("O preço do WBTC Quickswap é:", wbtcPriceQuickswap);

    const initialPrice = await calculateInitialPrice(wbtcPriceUniswap, wbtcPriceSushi, wbtcPriceQuickswap);
    console.log("Preço inicial:", initialPrice);

    // Agora você pode passar o valor de initialPrice para onde for necessário, como para o contrato inteligente
    // await deployContract(initialPrice);
}

async function calculateInitialPrice(wbtcPriceUniswap, wbtcPriceSushi, wbtcPriceQuickswap) {
    const averagePrice = (wbtcPriceUniswap + wbtcPriceSushi + wbtcPriceQuickswap) / 3;
    return averagePrice;
}

setInterval(main, 12000);
