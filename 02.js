// Paste into https://adventofcode.com/2023/day/3/input
{
  //Test schematic
//   let schematic = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`.split("\n");
  
  //Real schematic
  let schematic = document.getElementsByTagName("pre")[0].innerText.split("\n");
  schematic.pop()
 	let numberRegex = /\d+/
  let numberRegexG = /\d+/g
  let symbolRegex = /[^\.\d]/
  let gearRegex = /\*/
  
  function getSurroundingChars(x, y, length) {
    let surrounding = ["","",""]
    let lineStart = (x==0) ? 0 : x-1;
    
    //Get row above if not at top
		if (y != 0) {
      surrounding[0] = schematic[y-1].substr(lineStart, length+2)
    }
    
    //Get current row with front and back characters
    surrounding[1] = schematic[y].substr(lineStart,length+2)
    
    //Get row below if not at bottom
    if (y != schematic.length-1) {
      surrounding[2] = schematic[y+1].substr(lineStart, length+2)
    }
    
		return surrounding
  }
  
  function getFullNum(x, y) {
    let line = schematic[y];
    let leftShift = 0
    let rightShift = 0
    
    while (x-leftShift-1 >= 0 && !isNaN(parseInt(line[x-leftShift-1]))) {
    	leftShift += 1       
		}
    
    while (x+rightShift-1 >= 0 && !isNaN(parseInt(line[x+rightShift+1]))) {
    	rightShift += 1       
		}
    
    return parseInt(line.substr(x-leftShift,leftShift+rightShift+1))
  }
  
  
  let output1 = 0
  let output2 = 0
  for (let y = 0; y < schematic.length; y++) {
    //Part 1
    let lineFinished = false
    let line = schematic[y]
    
    while (!lineFinished) {
      let match = line.match(numberRegex);
			if (match == null) {lineFinished = true; break}
      let number = match[0];
      
      //Check surrounding indexes for symbols
      let surrounding = getSurroundingChars(match.index, y, number.length).join("")
      //if surrounded, add to output
      if (symbolRegex.test(surrounding)) output1 += parseInt(number);

// 			console.log(number, match.index, y, surrounding);
      
      line = line.replace(numberRegex, `.`.repeat(number.length));
    }
    
    //Part 2
    lineFinished = false
    line = schematic[y] //Replace because it destructively reads
    
    while (!lineFinished) {
      let match = line.match(gearRegex);
			if (match == null) {lineFinished = true; break}
      line = line.replace(gearRegex, `.`);
      
      let surrounding = getSurroundingChars(match.index, y, 1)
      
      //Check how many numbers, and ignore it if not 2
      if (surrounding.join(".").match(numberRegexG).length != 2) continue;
      
      //Get which ones have a number in them (and which ones have 2)
//       let surroundingNumCount = [
//         (surrounding[0].match(numberRegexG) != null) ? surrounding[0].match(numberRegexG).length : 0,
//         (surrounding[1].match(numberRegexG) != null) ? surrounding[1].match(numberRegexG).length : 0,
//         (surrounding[2].match(numberRegexG) != null) ? surrounding[2].match(numberRegexG).length : 0
//       ]
      let num1 = 0; let num2 = 0
      
      // Resolve numbers
      let numMatch0 = surrounding[0].match(numberRegex)
      if (numMatch0 != null) num1 = getFullNum(numMatch0.index+match.index-1, y-1)
      
      let numMatch1 = surrounding[1].match(numberRegex)
      if (numMatch1 != null) {
        let temp = getFullNum(numMatch1.index+match.index-1, y)
        if (num1 == 0) num1 = temp
        else num2 = temp
      }
      
      let numMatch2 = surrounding[2].match(numberRegex)
      if (numMatch2 != null) {
        let temp = getFullNum(numMatch2.index+match.index-1, y+1)
        if (num1 == 0) num1 = temp
        else num2 = temp
      }
      
      //If two lines did not have a number
      // Then two numbers must've been on the same line
      // That means the one on the right was missed,
      // and it *must* be at the edge
      if (num2 == 0) {
        let row = 0
        while (!numberRegex.test(surrounding[row])) {
          row += 1
          if (row > 2) {
            console.error("Couldn't find a number in surrounding?")
            break;
          }
        }
        num2 = getFullNum(match.index+1, y-1+row)
      }
      
      if (isNaN(num1) || isNaN(num2)) {
        console.warn("NaN found at ("+match.index+","+y+"):",num1,num2, "\n"+surrounding.join("\n"))
      }
      output2 += num1 * num2
    }
  }

	console.log("Part 1:",output1);
	console.log("Part 2:",output2);
}
