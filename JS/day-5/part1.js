const fs = require('fs');
const textFile = fs.readFileSync(__dirname + '/input-values.txt').toString().split('\r\n').filter(x => x);
const seeds = textFile.shift().replace("seeds: ", "").split(" ");
let map = {
    "seed-to-soil": [],
    "soil-to-fertilizer": [],
    "fertilizer-to-water": [],
    "water-to-light": [],
    "light-to-temperature": [],
    "temperature-to-humidity": [],
    "humidity-to-location": []
};
let currentMap = null;
for (let i = 0; i < textFile.length; i++) {
    if (textFile[i].includes("seed-to-soil")) {
        currentMap = "seed-to-soil";

    } else if (textFile[i].includes("soil-to-fertilizer")) {
        currentMap = "soil-to-fertilizer";
    }
    else if (textFile[i].includes("fertilizer-to-water")) {
        currentMap = "fertilizer-to-water";
    }
    else if (textFile[i].includes("water-to-light")) {
        currentMap = "water-to-light";
    }
    else if (textFile[i].includes("light-to-temperature")) {
        currentMap = "light-to-temperature";
    }
    else if (textFile[i].includes("temperature-to-humidity")) {
        currentMap = "temperature-to-humidity";
    }
    else if (textFile[i].includes("humidity-to-location")) {
        currentMap = "humidity-to-location";
    }
    else {
        map[currentMap].push(textFile[i].split(" ").map(x => parseInt(x)));
    }
}
lowestLocationNumber = Infinity;
let mapOrder = ["seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light", "light-to-temperature", "temperature-to-humidity", "humidity-to-location"];
for (let i = 0; i < seeds.length; i++) {
    let number = parseInt(seeds[i]);
    for (let j = 0; j < mapOrder.length; j++) {
        number = findDestinationNumber(number, map[mapOrder[j]]);
    }
    lowestLocationNumber = Math.min(number, lowestLocationNumber);
}

function findDestinationNumber(number, map) {
    let destinationNumber = number;
    for (let i = 0; i < map.length; i++) {
        const withinRange = map[i][1] <= number && map[i][1] + map[i][2] >= number;
        if (withinRange) {
            destinationNumber = map[i][0] + (number - map[i][1]);
            break;
        }
    }
    return destinationNumber
}

console.log(lowestLocationNumber)

