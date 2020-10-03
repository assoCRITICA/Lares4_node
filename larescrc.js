//this is the nonstandard implementation of "crc16" that the mainboard uses
function notcrc(message, chars){
    var bit,xor,reg,char;
    length=message.lastIndexOf('"CRC_16"')+'"CRC_16"'.length+(chars.length-message.length);
    reg=65535;
    for(var s=0; s<length; s++)
        for(char=chars[s],bit=128; bit; bit>>=1){
            if(32768&reg){
                xor=1
            }
            else{
                xor=0
            }
            reg<<=1;
            reg&=65535;
            if(char&bit){
                reg++;
            }
            if(xor){
                reg^=4129;
            }
        }
    return'0x'+reg.toString(16)
}

//this function adds support for unicode characters, as it splits multiple byte characters into single bytes one
function charsto8bit(message){
    for(var chars=[],n=0;n<message.length;n++){
        var char=message.charCodeAt(n);
        if (char < 128) {
            chars.push(char);
          } else {
            if (char < 2048) {
              chars.push(192 | char >> 6, 128 | 63 & char);
            } else {
              if (char < 55296 || char >= 57344) {
                chars.push(224 | char >> 12, 128 | char >> 6 & 63, 128 | 63 & char);
              } else {
                n++;
                char = 65536 + ((1023 & char) << 10 | 1023 & message.charCodeAt(n));
                chars.push(240 | char >> 18, 128 | char >> 12 & 63, 128 | char >> 6 & 63, 128 | 63 & char);
              }
            }
          };
    }
    return chars
}

function getcrc(message){
    return(notcrc(message,charsto8bit(message)))
}

function addcrc(data){
    let datastring = JSON.stringify(data);
    datastring = datastring.substring(0,datastring.length-1);
    datastring+= ',"CRC_16":';
    // console.log("datastring = "+ datastring)
    // console.log(getcrc(datastring))
    datastring+= `"${getcrc(datastring)}"}`;
    return datastring;
}
module.exports = addcrc