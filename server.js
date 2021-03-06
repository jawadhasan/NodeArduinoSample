const db = require('./dbservice');
const getDateString = require('./utils');

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM3', { baudRate: 9600 })

const parser = new Readline("\r\n");
port.pipe(parser);
let counter = 0;

//Event binding. This event will be called when data arrives
parser.on('data', line => {
  counter++;
  console.log(`> ${line}`);
  if(isNaN(line) || line > 1023) return;

  let streamObject = { x : getDateString(), y : line.trim() };
     //persistence
     db.get('sensorData')
     .push(streamObject)
     .write();
     console.log(`counter: ${counter}`)
});
//port.write('ROBOT POWER ON\n')
