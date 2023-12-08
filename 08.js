//Paste into https://adventofcode.com/2023/day/8/input
{
//   let input = `LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)
// `.split("\n\n");
  
  let input = document.getElementsByTagName("pre")[0].innerText.split("\n\n");
  
  let pattern = input[0];
  
  let map = {}
  let curLocations = []
  
  for (let line of input[1].split("\n").slice(0,-1)) {
    let items = line.split(/\W+/g);
    map[items[0]] = {L:items[1],R:items[2]}
    
    if (items[0][2] == 'A') curLocations.push(items[0])
  }
  
  let curLocation = "AAA"
  let stepPt1 = 0
  while (curLocation != "ZZZ") {
//     console.log(stepPt1, "->", stepPt1%pattern.length, "->", pattern[stepPt1%pattern.length])
//     console.log(curLocation, "->", map[curLocation])
    curLocation = map[curLocation][pattern[stepPt1%pattern.length]]
    stepPt1++
  }

  let counter = 0
  let output2 = 1
  let cycleSizes = []
  let processedCycles = 0
  while (processedCycles != curLocations.length) {
    let direction = pattern[counter%pattern.length]

    curLocations.forEach((location, index) => {
      curLocations[index] = map[location][direction]
      
      if (location[2] == 'Z' && cycleSizes[index] == undefined) {
        output2 *= counter/pattern.length
        delete curLocations[index]
        processedCycles++
      }
    })
    counter++
  }
  output2 *= pattern.length
  
  
  console.log("Part 1", stepPt1)
  console.log("Part 2", output2)
}
