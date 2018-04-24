let MidiStream = require('midi-stream')
let Observ = require('observ')
let ArrayGrid = require('array-grid')

// use Launchpad for Novation Launchpad
// use MPKmini2 for Akai MPK Mini2
let launchpad = MidiStream ('Launchpad',{
	normalizeNotes: true
})
launchpad.on('data', (data) => console.log(data))
launchpad.on('data', (data) => {
	if(data[1] == 104){
		for (let i=0; i < 120; i++){
			launchpad.write([144, i, 0])
			// console.log('normalize')
		}
	} 
	else {
		let x =  Math.floor(Math.random()*127)
		launchpad.write([data[0], data[1], x])
		// console.log("color ",x)
	}
		
})
	

// // make parse a grid value
// function LaunchpadToGrid(midiPort){
// 	var obs = Observ(ArrayGrid([],[8,8]));
// 	midiPort.on('data',(data) => {
// 		var col = data[1] % 16 
// 		var row = Math.floor(data[1] / 16)
// 		if (col < 8 && row < 8) {
// 			var newValue = ArrayGrid(obs().data.slice(), obs().shape)
// 			newValue.set(row, col, data[2])
// 			obs.set(newValue)
// 		}
// 	})
// 	return obs
// }

// // input grid container 
// var inputGrid = LaunchpadToGrid(launchpad)

// inputGrid((grid) => {
// 	var result = ''
// 	for (var row = 0; row < grid.shape[0]; row++) {
// 		for (var col = 0; col < grid.shape[1]; col++) {
// 			result += (' ' + (grid.get(row,col) || 0)).slice(-3) + ' '
// 		}
// 		result += '\n'
// 	}
// 	console.log(result)	
// })

