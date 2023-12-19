// read input from file (input-values.txt) and parse
const fs = require('fs');
const input = fs.readFileSync(__dirname + '/input-values.txt').toString().split('\n').filter(x => x);
let sum = 0;
for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const reverseLine = input[i].split('').reverse().join('');
    const regex = new RegExp("(\\d|one|two|three|four|five|six|seven|eight|nine|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)");
    const number = regex.exec(line)[0];
    const reverseNumber = regex.exec(reverseLine)[0];
    const concatNumber = convertStringToNumber(number) + convertStringToNumber(reverseNumber);
    sum += parseInt(concatNumber);

}
console.log(sum);
function convertStringToNumber(number) {
    if (isNaN(number)) {
        switch (number) {
            case "one":
            case "eno":
                number = "1";
                break;
            case "two":
            case "owt":
                number = "2";
                break;
            case "three":
            case "eerht":
                number = "3";
                break;
            case "four":
            case "ruof":
                number = "4";
                break;
            case "five":
            case "evif":
                number = "5";
                break;
            case "six":
            case "xis":
                number = "6";
                break;
            case "seven":
            case "neves":
                number = "7";
                break;
            case "eight":
            case "thgie":
                number = "8";
                break;
            case "nine":
            case "enin":
                number = "9";
                break;
        }
    }
    return number
}