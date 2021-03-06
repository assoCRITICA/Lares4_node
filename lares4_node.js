const config = require("./config.js");
const wsock = require('ws');
const commands = require('./commands.js')
let ws = null
let outputs = {}
let zones = {}
let HAS = {}
function initWs(IP, pin){
    ws = new wsock('wss://'+IP+'/KseniaWsock', ['KS_WSOCK'], {
        rejectUnauthorized: false,
        perMessageDeflate: false,
    });
    ws.on('error',(e) => {
        console.log("error "+e);
    });
    ws.on('open',() => {
        console.log("connected");
        ws.send(commands.login(pin));
    });
    ws.on('message',messageHandler);

}

function getOutId(output){
    for(const element of outputs){
        if(element['DES'].toLowerCase === output)
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
        HAS = msg["PAYLOAD"]["BUS_HAS"]
    }
}

function writeOutput(output, state){
    ws.send(commands.setOutput(getOutId(output),state))
}
module.exports = {
    initWs,
    writeOutput
}
