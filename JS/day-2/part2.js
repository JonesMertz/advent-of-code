const fs = require('fs');
const rawGames = fs.readFileSync(__dirname + '/input-values.txt').toString().split('\n')

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

let sum = 0;
for (let i = 0; i < rawGames.length; i++) {
    let gameCounter = {
        blue: 0,
        minimumRequiredBlue: 0,
        red: 0,
        minimumRequiredRed: 0,
        green: 0,
        minimumRequiredGreen: 0,
        wasInvalid: false,
        addToCount: function (color, count) {
            this[color.toLowerCase()] += count;
        },
        changeCount: function (color, count) {
            this["minimumRequired" + color.capitalize()] = Math.max(count, this["minimumRequired" + color.capitalize()]);
        },
        getProductOfMinimumRequired: function () {
            return this.minimumRequiredBlue * this.minimumRequiredGreen * this.minimumRequiredRed;
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
            gameCounter.changeCount(color, parseInt(count));
        })
        gameCounter.isValidSubset();
        gameCounter.resetCount();
    })
    sum += gameCounter.getProductOfMinimumRequired();
}

console.log(sum);