// read file in same directory and parse into array of strings
const fs = require('fs');
const input = fs.readFileSync('input_8.txt').toString().split('\n').filter(x => x);
const directions = input.shift();
const map = {};
input.forEach(x => {
    x = x.replaceAll(' ', '');
    x = x.split('=');
    const key = x[0];
        const value = x[1].split(',').map(y => {
            return y.replace("(", "").replace(")", "");
        });
        map[key] = value;
});

let currentPositions = Object.keys(map).filter(x => x.endsWith("A")); // part 1 input ["AAA"]
let currentDirection = directions[0];
let currentIndex = 0;
let steps = 0;
let cycles = currentPositions.map(pos => findCycle(map, pos, directions));
console.log("cycles", cycles);
console.log("lcm", lcmOfArray(cycles));
function gcd(a, b) {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
function lcmOfArray(numbers) {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = lcm(result, numbers[i]);
    }
    return result;
}

/* while(!currentPositions.every(pos => pos.endsWith("Z"))) {
    if(currentDirection === "L") {
        currentPositions = currentPositions.map((pos) => map[pos][0]);
        currentDirection = directions[++currentIndex];
    } else {
        currentPositions = currentPositions.map((pos) => map[pos][1]);
        currentDirection = directions[++currentIndex];
    }
    if(currentDirection === undefined) {
        currentDirection = directions[0];
        currentIndex = 0;
    }
    steps++;
} */
console.log(findCycle(map, currentPositions[0], directions))
console.log(steps);

function findCycle(map, startPosition, directions) {
    currentPositions = [startPosition]
    let currentDirection = directions[0];
    let currentIndex = 0;
    let steps = 0;
    console.log("findCycle", currentPositions);
    while(!currentPositions.every(pos => pos.endsWith("Z"))) {
        if(currentDirection === "L") {
            currentPositions = currentPositions.map((pos) => map[pos][0]);
            currentDirection = directions[++currentIndex];
        } else {
            currentPositions = currentPositions.map((pos) => map[pos][1]);
            currentDirection = directions[++currentIndex];
        }
        if(currentDirection === undefined) {
            currentDirection = directions[0];
            currentIndex = 0;
        }
        steps++;
    }
    return steps;
}
//console.log(map);