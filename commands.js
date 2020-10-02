const crc = require('./larescrc.js')
function login(){

    let message =  baseCommand()
    message['PAYLOAD']['PIN']='123456';
    return crc(message)
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
        "ID": (++commandStatus['ID']).toString,
        "TIMESTAMP":time,
        "PAYLOAD": {}
    }
    if(commandStatus['ID_LOGIN'])
        command['PAYLOAD']["ID_LOGIN"] = commandStatus["ID_LOGIN"]
    return command
}

module.exports = {
    login,
    confirmLogin
}