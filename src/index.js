'use strict';

const {WSv2} = require('bitfinex-api-node');

let counter = 0;
let trades = {};

async function execute() {
    const ws = new WSv2({transform: true});
    ws.on('error', e => debug('WSv2 error: %s', e.message | e));
    await ws.open();

    ws.onTrades({symbol: 'tBTCUSD'}, (t) => {
        const now = Date.now();
        const id = '' + t.id;
        if (trades[id]) {
            console.log(`${counter} BTC/USD trade exists: lag=${now - t.mts} amount:${t.amount} price:${t.price}`)
        } else {
            counter++;
            trades[id] = true;
            console.log(`${counter} BTC/USD trade: lag=${now - t.mts}, Id: ${id}, Price: ${t.price}, Amount: ${t.amount}`)
        }
    });

    await ws.subscribeTrades('tBTCUSD');
    // await ws.close()
}

execute()
