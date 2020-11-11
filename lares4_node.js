const config = require("./config.js");
const wsock = require('ws');
const commands = require('./commands.js')
let ws = null
let outputs = {}
let zones = {}
function initWs(){
    ws = new wsock('wss://192.168.3.108/KseniaWsock', ['KS_WSOCK'], {
        rejectUnauthorized: false,
        perMessageDeflate: false,
    });
    ws.on('error',(e) => {
        console.log("error "+e);
    });
    ws.on('open',() => {
        console.log("connected");
        ws.send(commands.login());
    });
    ws.on('message',messageHandler);

}

function getOutId(output){
    for(const element of outputs){
        if(element['DES'] === output)
        return element['ID']
    }
    
    return null
}

function messageHandler(message){
    console.log(message);
    msg = JSON.parse(message);
    if (msg["CMD"] === "LOGIN_RES")
    {
        commands.confirmLogin(msg['PAYLOAD']['ID_LOGIN']);
        ws.send(commands.read());
    }
    if (msg["CMD"] === "READ_RES")
    {
        outputs = msg["PAYLOAD"]["OUTPUTS"]
        zones = msg["PAYLOAD"]["ZONES"]
        getOutId("uscita virtuale")
    }
}

initWs();
