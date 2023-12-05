//This has been put into *Bad Attempts* because it _Ran out of memory_
//I'm tempted to not even publicly share it because I knew it was a bad
//way to solve it while writing it, but it's almost midnight.
//I hope tomorrow I can think of a not-terrible way of doing it.

//...
//I fixed one thing that was making the bad structure exponentially
//worse, but after doing that I realized I was being dumb and trying
//to make a lookup table(s) when I'm being given the numbers at the start.

//It at least works with the test input :S


// Paste into https://adventofcode.com/2023/day/5/input
{
//   Test input
  let input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split("\n");
  
  // let input = document.getElementsByTagName("pre")[0].innerText.split("\n");
  
  let desiredSeeds = []
  
  //Structure = 
  // [index] = {
  //	seeds_soil: [SeedsIndex: SoilIndex],
  //	soil_seeds: [SoilIndex: SeedsIndex],
  //	soil_fertilizer: [SoilIndex: FertilizerIndex],
  //	etc...
  // }
  let identify = [];
  
  let path = [
  	"seeds",
  	"soil",
  	"fertilizer",
  	"water",
  	"light",
  	"temperature",
  	"humidity",
  	"location"
  ]
  
  let step = -1
  input.forEach((line) => {
    if (line == "") {
      //Is break between steps.
      // Advance step and skip line.
      step += 1
      return;
    }
    let nums = line.split(" ");
    if (step == -1) {
      desiredSeeds = line.split(":")[1].trim().split(" ");
      return;
    } else if (nums.length != 3) {
      //Is a section header
      // Skip line.
      return;
    }
    
    let toStart = parseInt(nums[0])
    let fromStart = parseInt(nums[1])
    let range = parseInt(nums[2])
    
    let fromMode = `${path[step]}_${path[step+1]}`
    let toMode = `${path[step+1]}_${path[step]}`
    
    for (let rangeIndex = 0; rangeIndex < range; rangeIndex += 1) {
      let fromIndex = fromStart+rangeIndex; let toIndex = toStart+rangeIndex;
      
      if (identify[fromMode] == undefined) identify[fromMode] = {};
      if (identify[toMode] == undefined) identify[toMode] = {};
      
      identify[fromMode][fromIndex] = toIndex
      identify[toMode][toIndex] = fromIndex
    }
  })
  
  function fromIndexToIndex(fromIndex, fromString, toString) {
    let curIndex = fromIndex
    
    let startIndex = path.indexOf(fromString);
    let endIndex = path.indexOf(toString);
    let dir = (startIndex < endIndex) ? 1 : -1;
//     console.log(`${fromString}:${startIndex}-${toString}:${endIndex}->${dir}`)
    
    for(let step = startIndex; step != endIndex; step += dir) {
//       console.log(path[step], curIndex)
      let nextPath = `${path[step]}_${path[step+dir]}`
      
      if (identify[nextPath] == undefined) console.warn(`Identify at index ${nextPath} is undefined??`)
      
      let tempIndex = identify[nextPath][curIndex];
      curIndex = (tempIndex != undefined) ? tempIndex : curIndex;
    }
    return curIndex;
  }
  
  console.log(desiredSeeds)
  console.log(identify)
  
  let closestLocation = 999999999999
  desiredSeeds.forEach((seedStr) => {
    let seed = parseInt(seedStr)
    let location = fromIndexToIndex((seed), "seeds", "location")
    if (location < closestLocation) {
      closestLocation = location;
    }
		console.log(seed, "->", location)
  })
  
  
	console.log("Part 1", closestLocation)
}
