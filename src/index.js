'use strict'

const { WSv2 } = require('bitfinex-api-node')

let counter = 0

async function execute () {
    const ws = new WSv2({transform: true})
    ws.on('error', e => debug('WSv2 error: %s', e.message | e))
    await ws.open()

    ws.onTrades({ symbol: 'tBTCUSD' }, (t) => {
        counter++
        const now = Date.now();
        console.log(`${counter} BTC/USD trade: lag=${now-t.mts} amount:${t.amount} price:${t.price}`)
    })

    await ws.subscribeTrades('tBTCUSD')
    // await ws.close()
}

execute()
