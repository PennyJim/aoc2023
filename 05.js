// Paste into https://adventofcode.com/2023/day/5/input
{
//   Test input
//   let input = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`.split("\n\n");
  
  let input = document.getElementsByTagName("pre")[0].innerText.split("\n\n");
  
  function getIntersection(start, inputRange, fromStart, range) {
    let inputOffset = fromStart-start
    let rangeDiff = inputRange - range

    //input range is too far before to intersect
    if (inputOffset >= inputRange) return 0;
    //map range is too far before to intersect
    if (-inputOffset >= range) return 0;
    //input is contained within map
    if (-inputOffset >= 0 && -inputOffset+inputRange <= range ) return 0

    if (inputOffset >= 0) {
      //Tail cut off
      return inputOffset
    } else {
      //Head cut off
      return range+inputOffset
    }
  }
  
  let indexes1 = []
  let indexes2 = []
  input.forEach((section) => {
    //Get numbers after section head
    let ranges = section.split(":")[1].trim().split("\n");
//     console.log(ranges)
    //If there's only one line of numbers, it is seeds and the start
    if (ranges.length == 1) {
      indexes1 = ranges[0].split(" ");
			for (let index = 0; index < indexes1.length; index += 2) {
        let start = indexes1[index] = parseInt(indexes1[index]);
        let range = indexes1[index+1] = parseInt(indexes1[index+1]);
        
        indexes2.push([start,range]);
      }
      return
    }
    
    let newIndexes1 = [...indexes1]
    let newIndexes2 = indexes2.map((x) => {
      return [x[0], x[1]]
    });
   	
    ranges.forEach((rangeLine) => {
      // Split string into numbers
      let rangeArr = rangeLine.split(" ");
      let destStart = parseInt(rangeArr[0]);
      let fromStart = parseInt(rangeArr[1]);
      let range = parseInt(rangeArr[2])
      
      
      let offset = destStart - fromStart;
      indexes1.forEach((number, index) => {
        if (number >= fromStart && number < fromStart+range) {
          newIndexes1[index] = number+offset
//           console.log(newIndexes)
        }
      })
      for (let index = 0; index < indexes2.length; index++) {
        let start = indexes2[index][0]
        let inputRange = indexes2[index][1]
        
        let intersection = getIntersection(start, inputRange, fromStart, range)
        
        if (intersection != 0) {
          let head = [start, intersection]
          let tail = [start+intersection, inputRange-intersection]
          indexes2.splice(index, 1, head, tail)
          newIndexes2.splice(index, 1, [...head], [...tail])
//     			console.log(indexes2[index], "->",head,tail)
          inputRange = intersection
        }
        
        if (start >= fromStart && start < fromStart+range) {
          newIndexes2[index][0] = start+offset
//           console.log(indexes2[index][0], "->", start+offset);
        }
      }
    })
//     console.table(indexes2)
//     console.log(indexes1, "->", newIndexes1);
//     console.log(indexes2, "->", newIndexes2);
    indexes1 = newIndexes1;
    indexes2 = newIndexes2;
  })
  
  let output1 = [Number.MAX_SAFE_INTEGER]
  let output2 = [Number.MAX_SAFE_INTEGER]
  function getClosest(location, output) {
    if (location < output[0]) output[0] = location;
  }
  indexes1.forEach((location) => {getClosest(location, output1)})
  indexes2.forEach((location) => {getClosest(location[0], output2)})
  
  console.log("Part 1:", output1[0])
  console.log("Part 2:", output2[0])
}
