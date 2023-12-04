//Paste into the console of https://adventofcode.com/2023/day/1/input
{ //Surrounded by brackest so console doesn't complain about redefining lets
  let lines = document.getElementsByTagName("pre")[0].innerText.split("\n")
  lines.pop() // drop final empty string

  let numberArray = [undefined,/one/,/two/,/three/,/four/,/five/,/six/,/seven/,/eight/,/nine/]
  function resolveNumber(numString) {
    let number = parseInt(numString)
    if(!isNaN(number)) return number;

    for (i=1;i<10;i++) {
      if (numString.match(numberArray[i])) return i;
    }
  }

  function matchLast(line, regex) {
    { // Regex find last match
      let lastNum = null
      let lastRegex = new RegExp(regex, "y")
      for (i = line.length; i > -1; i--) {
        lastRegex.lastIndex = i;
        lastNum = lastRegex.exec(line);
        if (lastNum != null) {
          return lastNum[0]
        }
      }
    }
  }

  function processLine(line, regex) {
    let lineNums = line.match(regex) || [0]
		let output = resolveNumber(lineNums[0]) * 10
    output += resolveNumber(matchLast(line, regex))
    return output
  }

  let part1Regex = /\d/g
  let part2Regex = /\d|one|two|three|four|five|six|seven|eight|nine/g
  let output1 = 0
  let output2 = 0
//   for (let line of lines) {
  for (let line of lines) {
    output1 += processLine(line, part1Regex)
    output2 += processLine(line, part2Regex)
  }

  console.log("Part 1:", output1)
  console.log("Part 2:", output2)
}
