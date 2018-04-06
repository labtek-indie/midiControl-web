var MidiStream = require('midi-stream')
var Observ = require('observ')
var ArrayGrid = require('array-grid')

// var grid = ArrayGrid([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[4,4])
// grid.get(0,1)
// grid.get(1,2)
// grid.get(2,3)
// grid.get(3,4)
// grid.data

// use Launchpad for Novation Launchpad
// use MPKmini2 for Akai MPK Mini2
var launchpad = MidiStream ('Launchpad',{
	normalizeNotes: true
})
launchpad.on('data', console.log)
launchpad.on('data', (data) => launchpad.write(data))

// make parse a grid value
function LaunchpadToGrid(midiPort){
	var obs = Observ(ArrayGrid([],[8,8]))
	midiPort.on('data',(data) => {
		var col = data[1] % 16 
		var row = Math.floor(data[1] / 16)
		if (col < 8 && row < 8) {
			var newValue = ArrayGrid(obs().data.slice(), obs().shape)
			newValue.set(row, col, data[2])
			obs.set(newValue)
		}
	})
	return obs
}

// input grid container 
var inputGrid = LaunchpadToGrid(launchpad)
function drawTerminal(grid) {
	var result = ''
	for (var row = 0; row < grid.shape[0]; row++) {
		for (var col = 0; col < grid.shape[1]; col++) {
			result += (' ' + (grid.get(row,col) || 0)).slice(-3) + ' '
		}
		result += '\n'
	}
	console.log(result)
}
inputGrid(drawTerminal)