const getDateString = require('./utils');

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM3', { baudRate: 9600 })

const parser = new Readline("\r\n");
port.pipe(parser);

parser.on('data', line => {
  console.log(`> ${line}`);
  if(isNaN(line) || line > 1023) return;

  let streamObject = JSON.stringify({ x : getDateString(), y : line }).replace("\\r", "");;
  console.log(streamObject);
});
//port.write('ROBOT POWER ON\n')
