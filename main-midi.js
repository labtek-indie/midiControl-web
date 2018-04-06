var MidiStream = require('midi-stream')
var Observ = require('observ')
var ArrayGrid = require('array-grid')

var grid = ArrayGrid([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[4,4])
grid.get(0,1)
grid.get(1,2)
grid.get(2,3)
grid.get(3,4)
grid.data

// use Launchpad for Novation Launchpad
// use MPKmini2 for Akai MPK Mini2
var keyboard = MidiStream ('MPKmini2',{
	normalizeNotes: true
})
keyboard.on('data', console.log)

