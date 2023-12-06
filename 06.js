//Paste into https://adventofcode.com/2023/day/6/input
{
//   let input = `Time:      7  15   30
// Distance:  9  40  200`.split("\n")
  
  let input = document.getElementsByTagName("pre")[0].innerText.split("\n")
  
  //Split by whitespace, then drop the row header
  let times = input[0].split(/\s+/)
  let distances = input[1].split(/\s+/)
  times.shift(); distances.shift();
  
  // Convert strings to integers
  let mapToInt = (str) => { return parseInt(str) }
  times = times.map(mapToInt);
  distances = distances.map(mapToInt)
  
  //separate out numbers and collapse whitespace before converting
  let time = parseInt(input[0].split(":")[1].replace(/\s+/g, ""))
  let distance = parseInt(input[1].split(":")[1].replace(/\s+/g, ""))
  
  //calculate nearest
  function positiveSolutions(a, b, c) {
    let square = Math.sqrt(b**2-4*c*a)
    
    let solution1 = (-b + square) / 2*a
    let solution2 = (-b - square) / 2*a
    
    //Added a tiny shift because imprecision
    // would cause it to somehow fail on the
    // test values of b=30 and c=-200
    //Floor solution1 rather than ceil because 
    // `end - start` is half exclusive
    solution1 = Math.floor(solution1) 			//one lower integer than winning
    solution2 = Math.floor(solution2-0.00001)	//highest integer that wins
    
    return [solution1,solution2]
  }
  
  let output1 = 1
  for (let i = 0; i < times.length; i++) {
    let b = times[i];
    let c = distances[i];
    
    let [solution1, solution2] = positiveSolutions(-1, b, -c)
    
    output1 *= solution2-solution1
  }
  let output2 = positiveSolutions(-1, time, -distance)
  
  console.log("Part 1:", output1)
  console.log("Part 2:", output2[1] - output2[0])
}
