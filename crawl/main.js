const { insertData } = require("../database/dts/insert_data");
const { coinbase_cralwer } = require("./crawler/coinbase");
const { ethereum_cralwer } = require("./crawler/ethereum");
const { protocol_cralwer } = require("./crawler/protocol");

async function protocol_main() {
    const data = await protocol_cralwer();
    await insertData(data);
}

// protocol_main()


async function ethereum_main() {
    const data = await ethereum_cralwer();
    await insertData(data);
}
// ethereum_main()

async function coinbase_main() {
    
    const data = await coinbase_cralwer();
    await insertData(data);
}
coinbase_main()