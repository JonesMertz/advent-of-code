const fs = require('fs');
const textFile = fs.readFileSync(__dirname + '/input-values.txt').toString().replace("Time:", "").replace("Distance:", "").split('\r\n').filter(x => x);
const times = textFile[0].split(" ").map(x => parseInt(x)).filter(Boolean);
const distances = textFile[1].split(" ").map(x => parseInt(x)).filter(Boolean);

console.log(times);
console.log(distances);
let raceResults = [];
for (let i = 0; i < times.length; i++) {
    let sum = 0;
    let distanceToBeat = distances[i];
    for (let j = 0; j < times[i]; j++) {
        const speed = j
        const timeRemainingToTravel = times[i] - speed;
        const distanceTraveled = speed * timeRemainingToTravel;
        if (distanceTraveled > distanceToBeat) {
            sum++
        }
    }
    raceResults.push(sum);
}
console.log(raceResults);

const multipliedRaceResults = raceResults.reduce((a, b) => a * b, 1);

console.log(multipliedRaceResults);