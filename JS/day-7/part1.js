const fs = require('fs');
const cardRanking = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
const reversedCardRanking = cardRanking.slice().reverse()

let hands = fs.readFileSync(__dirname + '/input-values.txt').toString().split('\r\n').map((x) => {
    return [x.split(" ")[0].split(""), parseInt(x.split(" ")[1])]
})

const CardToValue = (card) => {
    return reversedCardRanking.indexOf(card) + 1
}

const scoreHighCards = (hand) => {
    const cardValue = hand
        .slice()
        .reverse()
        .map((card, index) => {
            return CardToValue(card) * 100 ** index
        })

    return cardValue.reduce((a, b) => a + b, 0)
}

const scoreHandType = (hand) => {
    let occurences = {};
    for (let i = 0; i < hand.length; i++) {
        if (occurences[hand[i]] === undefined) {
            occurences[hand[i]] = 1;
        } else {
            occurences[hand[i]]++;
        }
    }
    if (Object.values(occurences).some(x => x === 5)) {
        return 70_000_000_000
    }
    if (Object.values(occurences).some(x => x === 4)) {
        return 60_000_000_000
    }
    if (Object.values(occurences).some(x => x === 3) && Object.values(occurences).some(x => x === 2)) {
        return 50_000_000_000
    }
    if (Object.values(occurences).some(x => x === 3)) {
        return 40_000_000_000
    }
    if (Object.values(occurences).reduce((a, b) => a + (b == 2 ? 1 : 0), 0) === 2) {
        return 30_000_000_000
    }
    if (Object.values(occurences).some(x => x === 2)) {
        return 20_000_000_000
    }
    return 10_000_000_000
}

const scoreHand = (hand) => {
    return scoreHandType(hand) + scoreHighCards(hand)
}

hands.sort((a, b) => {
    return scoreHand(a[0]) - scoreHand(b[0])
})

const result = hands.slice().map((hand, index) => {
    return hand[1] * (index + 1)
}).reduce((a, b) => a + b, 0)

console.log(result)