const config = require("./config.js");
const wsock = require('ws');
const commands = require('./commands.js')

function initWs(){
    const ws = new wsock('wss://192.168.3.108/KseniaWsock', ['KS_WSOCK'], {
        rejectUnauthorized: false,
        perMessageDeflate: false,
    });
    ws.on('error',(e) => {
        console.log("error "+e)
    })
    ws.on('open',() => {
        console.log("connected")
        ws.send(commands.login())
    })
    ws.on('message',messageHandler)

}

function messageHandler(message){
    console.log(message)
    msg = JSON.parse(message)
    if (message["CMD"] === "LOGIN_RES")
    {
        commands.confirmLogin(message['PAYLOAD']['ID_LOGIN'])
    }
}

initWs()