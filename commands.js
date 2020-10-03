const { Console } = require('console');
const crc = require('./larescrc.js')
function login(){
    let message =  baseCommand()
    message['CMD']="LOGIN"
    message['PAYLOAD_TYPE'] = "INSTALLER"
    message['PAYLOAD']['PIN']='123456';
    return(crc(message))
}

function read(){
    let message = baseCommand()
    message['CMD'] = "READ"
    messsage['PAYLOAD_TYPE'] = "MULTI_TYPE"
    message['PAYLOAD']['ID_READ'] = message['PAYLOAD']['ID_LOGIN']
    message['PAYLOAD']['TYPES']= [
        "ZONES",
        "OUTPUTS",
    ]
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
        "PAYLOAD":{},
        "TIMESTAMP":time,
    }
    if(commandStatus['ID_LOGIN'])
        command['PAYLOAD']["ID_LOGIN"] = commandStatus["ID_LOGIN"]
    return command
}

module.exports = {
    login,
    confirmLogin
}