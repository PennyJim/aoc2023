//Paste into console of https://adventofcode.com/2023/day/2/input
{
  let unparsedGames = document.getElementsByTagName("pre")[0].innerText.split("\n")
  unparsedGames.pop()
  
  function parseGame(game) {
    let parsedGame = {}
  	let dataStart = game.search(":")
  	parsedGame.gameID = parseInt(game.substr(5, dataStart-5))
  	let handfuls = game.substr(dataStart+2).split("; ")
  	parsedGame.handfuls = []
  	
  	for (let handful of handfuls) {
  		let handfulData = handful.split(", ")
  		let handfulObj = []
  		for (let color of handfulData) {
  			let colorData = color.split(" ");
  			handfulObj[colorData[1]] = parseInt(colorData[0]);
  		}
  		parsedGame.handfuls.push(handfulObj);
  	}
    
  	return parsedGame
  }
  
  function checkExceedMax(parsedGame, max) {
    let hasExceeded = false
  	for (let handful of parsedGame.handfuls) {
      if (handful.red > max.red) {hasExceeded = true; break}
      else if (handful.green > max.green) {hasExceeded = true; break}
      else if (handful.blue > max.blue) {hasExceeded = true; break}
    }
  	return hasExceeded
  }
  
  function minPossibleCubes(parsedGame) {
  	let max = {red:0,green:0,blue:0}
  	for(let handful of parsedGame.handfuls) {
    	if (handful.red > max.red) max.red = handful.red
    	if (handful.green > max.green) max.green = handful.green
    	if (handful.blue > max.blue) max.blue = handful.blue
    }
  	return max;
  }
  
  output1 = 0
  output2 = 0
  for (let game of unparsedGames) {
    let maxCubes = {red:12, green:13, blue:14}
  	let parsedGame = parseGame(game)
  	let hasExceeded = checkExceedMax(parsedGame, maxCubes)	
  	let minCubes = minPossibleCubes(parsedGame);
    output1 += (!hasExceeded) ? parsedGame.gameID : 0
  	output2 += minCubes.red * minCubes.green * minCubes.blue
  }
  console.log("Part 1:", output1)
  console.log("Part 2:", output2)
}
