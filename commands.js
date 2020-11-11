const { Console } = require('console');
const crc = require('./larescrc.js')
function login(){
    let message =  baseCommand()
    message['CMD']="LOGIN"
    message['PAYLOAD_TYPE'] = "INSTALLER"
    message['PAYLOAD']['PIN']='123456';
    return(crc(message))
}

function setOutput(outputID, desStatus){
    let message = baseCommand();
    message['CMD'] = "CMD_USR";
    message['PAYLOAD_TYPE'] = "CMD_SET_OUTPUT";
    message['PAYLOAD']['OUTPUT'] = {
        "ID" : outputID,//need to check id from read()
        "STA" : desStatus ? "ON" : "OFF"
    };
    return crc(message)
}
function read(){
    let message = baseCommand();
    message['CMD'] = "READ";
    message['PAYLOAD_TYPE'] = "MULTI_TYPES";
    message['PAYLOAD']['ID_READ'] = message['PAYLOAD']['ID_LOGIN'];
    message['PAYLOAD']['TYPES']= [
        "ZONES",
        "OUTPUTS",
    ];
    return(crc(message));
}

let commandStatus = {
    "SENDER": "laresnode",
    "ID":0
}

function confirmLogin(idLogin){
    commandStatus['ID_LOGIN'] = idLogin
}

function baseCommand(){
    let time = Math.floor(Date.now()/1000).toString();
    command = {
        "SENDER":commandStatus['SENDER'],
        "RECEIVER": "",
        "CMD":"",
        "ID": (++commandStatus['ID']).toString(),
        "PAYLOAD_TYPE":"",
        "PAYLOAD":{
            "PIN" : "123456" //the pin is only needed in specific cases, but putting it preemptively is easier and it works
        },
        "TIMESTAMP":time,
    }
    if(commandStatus['ID_LOGIN'])
        command['PAYLOAD']["ID_LOGIN"] = commandStatus["ID_LOGIN"]
    return command
}

module.exports = {
    login,
    confirmLogin,
    read,
    setOutput
}