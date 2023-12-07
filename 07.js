//Paste into https://adventofcode.com/2023/day/7/input
{
//   let input = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`.split("\n");
  
  //Thanks u/LxsterGames
  // https://redd.it/18cr4xr/
//   let input = `2345A 1
// Q2KJJ 13
// Q2Q2Q 19
// T3T3J 17
// T3Q33 11
// 2345J 3
// J345A 2
// 32T3K 5
// T55J5 29
// KK677 7
// KTJJT 34
// QQQJA 31
// JJJJJ 37
// JAAAA 43
// AAAAJ 59
// AAAAA 61
// 2AAAA 23
// 2JJJJ 53
// JJJJ2 41`.split("\n");
  
  let input = document.getElementsByTagName("pre")[0].innerText.split("\n");
  input.pop();
  input.unshift("23456 0")
  
  let cardValueMap1 = {
    '2':0,
    '3':1,
    '4':2,
    '5':3,
    '6':4,
    '7':5,
    '8':6,
    '9':7,
    'T':8,
    'J':9,
    'Q':10,
    'K':11,
    'A':12
  }
  let cardValueMap2 = {
    'J':0,
    '2':1,
    '3':2,
    '4':3,
    '5':4,
    '6':5,
    '7':6,
    '8':7,
    '9':8,
    'T':9,
    'Q':10,
    'K':11,
    'A':12
  }
  
  function getHandPower(hand) {
    let occurences = []
    
    for (let card of hand) {
      //use the 2nd map so J is index 0
      let cardValue = cardValueMap2[card];
      
      if (occurences[cardValue] == undefined) {
        occurences[cardValue] = 1
      } else {
      	occurences[cardValue]++
      }
    }
    
    let nonWildHighest = -1
    let highestCount = 0
    let pairCount = 0
    for (let count of occurences) {
      //Basic logic to ignore first item
      // Has the issue that a hand without a joker
      // skips a non-wild in this value, but we don't
      // need to calculate specail joker rules if
      // there is no jokers
      if (nonWildHighest == -1) nonWildHighest = 0
      else if (count > nonWildHighest) nonWildHighest = count

      if (count > highestCount) highestCount = count
      if (count == 2) pairCount += 1
    }

    let handPower = highestCount;
    //Bump it up or down to match value
    if (highestCount >= 4 || (highestCount == 3 && pairCount == 1)) {
      handPower++
    } else if (highestCount < 3 && pairCount != 2) {
      handPower--
    }
    
    let wildcardPower = nonWildHighest
    //Ignore wildcard rules if no wildcard (joker)
    if (occurences[0] != undefined) {
      wildcardPower += occurences[0]
      //Bump it up to match value
      // 0 : High card
      // 1 : One pair
      // 2 : two pair
      // 3 : three of a kind
      // 4 : full house
      // 5 : four of a kind
      // 6 : five of a kind
      if (wildcardPower >= 4 || (wildcardPower == 3 && pairCount == 2)) {
        wildcardPower++
      } else if (wildcardPower < 3 && pairCount != 2) {
        wildcardPower--
      }
  	} else {
      wildcardPower = handPower
    }
    
    return [handPower, wildcardPower]
  }
  
  //process lines into hand objects
  let hands = input.map((line) => {
    line = line.split(" ")
    let hand = {cards:line[0],bet:parseInt(line[1])}
    let powers = getHandPower(hand.cards)
    hand.power = powers[0];
    hand.wildPower = powers[1];
    
    return hand
  })
  
  function compareHands(hand1, hand2, useWildRules) {
    let powerType = (useWildRules) ? "wildPower" : "power"
    let valueMap = (useWildRules) ? cardValueMap2 : cardValueMap1
    if (hand1[powerType] != hand2[powerType]) return hand1[powerType] - hand2[powerType]
    
    for (let cardIndex = 0; cardIndex < hand1.cards.length; cardIndex++) {
      let card1 = valueMap[hand1.cards[cardIndex]]
      let card2 = valueMap[hand2.cards[cardIndex]]
      if (card1 == card2) continue;
      return card1 - card2
    }
  }
  
  
  hands.sort((a,b) => {return compareHands(a,b,false)})
  let output1 = 0
  hands.forEach((hand, index) => {
    output1 += hand.bet * index
  })
  console.table(hands);
  
  hands.sort((a,b) => {return compareHands(a,b,true)})
  let output2 = 0
  hands.forEach((hand, index) => {
    output2 += hand.bet * index
  })
  console.table(hands);
  
  console.log("Part 1:", output1)
  console.log("Part 2:", output2)
}
