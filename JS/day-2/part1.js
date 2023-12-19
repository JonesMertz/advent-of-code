const fs = require('fs');
const rawGames = fs.readFileSync(__dirname + '/input-values.txt').toString().split('\n')
//const gameIDs = rawGames.split(":").map(x => parseInt(x[0].replace("Game ", "")));
//const gameParsed = rawGames.split(":").map(x => x[1].split(";"));



let sum = 0;
for (let i = 0; i < rawGames.length; i++) {
    let gameCounter = {
        blue: 0,
        red: 0,
        green: 0,
        wasInvalid: false,
        addToCount: function (color, count) {
            this[color.toLowerCase()] += count;
        },
        isValidSubset: function () {
            const isInvalid = this.red > 12 || this.green > 13 || this.blue > 14;
            if (isInvalid) {
                this.wasInvalid = true;
            }
            return isInvalid;
        },
        resetCount: function () {
            this.blue = 0;
            this.red = 0;
            this.green = 0;
        }
    }
    let [gameID, game] = rawGames[i].split(":")
    gameID = parseInt(gameID.replace("Game ", ""));
    subsets = game.split(";");
    subsets.forEach((subset) => {
        const cubes = subset.split(",");
        cubes.forEach((cube) => {
            const [count, color] = cube.trim().split(" ");
            gameCounter.addToCount(color, parseInt(count));
        })
        gameCounter.isValidSubset();
        gameCounter.resetCount();
    })
    if (!gameCounter.wasInvalid) {
        sum += gameID;
    }
}
console.log(sum);
