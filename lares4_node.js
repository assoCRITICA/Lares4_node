const crc = require("./larescrc.js");
const config = require("./config.js");
const wsock = require('ws');
const commands = require('./commands.js')

function initWs(){
    // const manager = new Manager("wss://192.168.3.108", { 
    //     subprotocols: "KS_WSOCK"
    // });
    // var socket = manager.socket("/KseniaWsock")
    const ws = new wsock('wss://192.168.3.108/KseniaWsock', ['KS_WSOCK'], {
        rejectUnauthorized: false,
        perMessageDeflate: false,
    });
    ws.on('error',(e) => {
        console.log("error "+e)
    })
    ws.on('open',(e) => {
        console.log("connected")
        ws.send(commands.login())
    })
    ws.on('message',(m) => {
        console.log("message: "+ m)
    })

}
console.log("a")
initWs()