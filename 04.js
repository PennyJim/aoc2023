//Paste into https://adventofcode.com/2023/day/4/input
{
//   let table = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n")
  
  let table = document.getElementsByTagName("pre")[0].innerText.split("\n");
  table.pop();
  
  function readCard(cardLine) {
    let card = {}
    let start = cardLine.match(/:/).index
    let separator = cardLine.match(/\|/).index

    card.ID = parseInt(cardLine.substr(5, start-5));
    
    let winning = cardLine.substr(start+2, separator-start-2);
    let numbers = cardLine.substr(separator+2);
    
//     console.log(winning);
//     console.log(numbers);
    
    card.winning = [];
    card.numbers = [];
    
    for (let i = 0; i < winning.length; i += 3) {
      card.winning.push(parseInt(winning.substr(i, 2)));
    }
    for (let i = 0; i < numbers.length; i += 3) {
      card.numbers.push(parseInt(numbers.substr(i, 2)));
    }
    
    card.count = 1
		
    return card;
  }
  
  let cards = []
  table.forEach((cardLine) => {
    cards.push(readCard(cardLine));
  })
  
  let output1 = 0
  let output2 = 0
  cards.forEach((card) => {
    
    let score = 1
    let winCount = 0
    card.winning.forEach((winNum) => {
      if (card.numbers.includes(winNum)) {
        score <<= 1;
        winCount += 1;
      }
    })
		output1 += score >> 1
    
//     console.log(`Card ${card.ID} has ${winCount} wins with ${card.count} copies`)
// 		let debugString = `Card ${card.ID} adds ${card.count} copies of:`
    
    for (let i = card.ID; i <= card.ID + winCount - 1 && i < cards.length; i += 1) {
      cards[i].count += card.count;
// 			debugString += `\n\tCard ${cards[i].ID}`
    }
    
//     console.log(debugString);
    
    output2 += card.count;
  })
  
  console.log(output1);
  console.log(output2);
}
