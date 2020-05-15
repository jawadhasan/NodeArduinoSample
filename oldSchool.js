const getDateString = require('./utils');

const SerialPort = require('serialport')

const portName = 'COM3'; // portName = '/dev/tty.usbmodem1415';
var sp = new SerialPort(portName, {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: new SerialPort.parsers.Readline("\r\n")
});


//event binding
sp.on('data', function(input) {
  console.log(input);

  if(isNaN(input) || input > 1023) return;

  var streamObject = JSON.stringify({ x : getDateString(), y : input });
  console.log(streamObject);
});




