const Uniswap = require('./uniswap.js');
const Sushi = require('./sushi.js');
const Quickswap = require('./quickswap.js')

async function main() {
    const wbtcPriceUniswap = await Uniswap();
    console.log("O preço do WBTC Uniswap é:", wbtcPriceUniswap);

    const wbtcPriceSushi = await Sushi();
    console.log("O preço do WBTC Sushi é:", wbtcPriceSushi);

    const wbtcPriceQuickswap = await Quickswap();
    console.log("O preço do WBTC Quickswap é:", wbtcPriceQuickswap);
}

main();
