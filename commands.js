const { timeStamp } = require("console")
const crc = require('./larescrc.js')
function login(){
    let data = {
        "SENDER": "cgh4-R0j0",
        "RECEIVER": "",
        "CMD": "LOGIN",
        "ID": "1",
        "PAYLOAD_TYPE": "INSTALLER",
        "PAYLOAD": {
            "PIN": ""
            },
        "TIMESTAMP": ""
    };

    data['PAYLOAD']['PIN']='123456';
    data['TIMESTAMP'] = Math.floor(Date.now()/1000).toString();

    let datastring = JSON.stringify(data);
    datastring = datastring.substring(0,datastring.length-1);
    datastring+= ",\"CRC_16\":";
    datastring+= `"${crc(datastring)}"}}`;
    return datastring;
}

module.exports = {
    login: login
}