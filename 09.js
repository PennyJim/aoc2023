//Paste into https://adventofcode.com/2023/day/9/input
{
//   let input = `0 3 6 9 12 15
// 1 3 6 10 15 21
// 10 13 16 21 30 45
// `.split("\n").slice(0,-1);
  
  let input = document.getElementsByTagName("pre")[0].innerText.split("\n").slice(0,-1)
  
  input = input.map((line) => {
    return line.split(" ").map((a) => parseInt(a))
  })
  
  function extrapolatePattern(pattern) {
    //Get change in values
    let change = []
    for (let index = 0; index < pattern.length-1; index++){
      change.push(pattern[index+1]-pattern[index])
    }
    
    if (!change.every((input) => input == 0)) {
      // Recurse for pattern of change
      let [first, next] = extrapolatePattern(change)
      next += pattern[pattern.length-1]
      first = pattern[0] - first
      return [first,next]
      
    } else {
    	//If all change is 0, then finish recursion
      return [pattern[0],pattern[0]]
    }
  }
  
  let output1 = 0
  let output2 = 0
  input.forEach((pattern) => {
    let [first,next] = extrapolatePattern(pattern)
    output1 += next
    output2 += first
  })
  
  console.log("Part 1:", output1)
  console.log("Part 2:", output2)
}
