const fs = require('fs');
const textFile = fs.readFileSync(__dirname + '/input-values.txt').toString().replace("Time:", "").replace("Distance:", "").split('\r\n').filter(x => x);
const time = parseInt(textFile[0].split(" ").filter(Boolean).join(""));
const distance = parseInt(textFile[1].split(" ").filter(Boolean).join(""));

console.log(time);
console.log(distance);
let raceResults = [];
let sum = 0;
let distanceToBeat = distance;
for (let j = 0; j < time; j++) {
    const speed = j
    const timeRemainingToTravel = time - speed;
    const distanceTraveled = speed * timeRemainingToTravel;
    if (distanceTraveled > distanceToBeat) {
        sum++
    }
}
raceResults.push(sum);
console.log(raceResults);