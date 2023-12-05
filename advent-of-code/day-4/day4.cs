using System.IO;
using System.Linq;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace program
{
    class Day4
    {
        public void PartOne()
        {
            using StreamReader sr = new StreamReader("../../../day-4/input.txt");
            string line;
            string pattern = @"Card\s*\d+: ";
            string[] winningNumbers;
            string[] scratchCardNumbers;
            int[] parsedWinningNumbers = new int[10];
            int[] parsedScratchCardNumbers = new int[25];
            int sum = 0;
            while ((line = sr.ReadLine()) != null)
            {

                line = Regex.Replace(line, pattern, "");
                winningNumbers = line.Split(" | ")[0].Split(" ").Where(x => x != "").ToArray();
                scratchCardNumbers = line.Split(" | ")[1].Split(" ").Where(x => x != "").ToArray();

                int rowSum = 0;
                for (int i = 0; i < 10; i++)
                {
                    parsedWinningNumbers[i] = int.Parse(winningNumbers[i]);
                    for (int j = 0; j < 25; j++)
                    {
                        parsedScratchCardNumbers[j] = int.Parse(scratchCardNumbers[j]);
                        if (parsedWinningNumbers[i] == parsedScratchCardNumbers[j])
                        {
                            if (rowSum == 0)
                            {
                                rowSum = 1;
                            }
                            else
                            {
                                rowSum = rowSum * 2;
                            }
                            break;
                        }
                    }
                }
                sum += rowSum;
            }
            Console.WriteLine("Part One Result: " + sum);
        }
        public void PartTwo()
        {
            using StreamReader sr = new StreamReader("../../../day-4/input.txt");
            string line;
            string pattern = @"Card\s*\d+: ";
            string[] winningNumbers;
            string[] scratchCardNumbers;
            int[] parsedWinningNumbers = new int[10];
            int[] parsedScratchCardNumbers = new int[25];
            int sum = 0;
            int cardStackLength = 213;
            int cardIndex = 0;
            int[] cardCopies = new int[cardStackLength];
            while ((line = sr.ReadLine()) != null)
            {

                line = Regex.Replace(line, pattern, "");
                winningNumbers = line.Split(" | ")[0].Split(" ").Where(x => x != "").ToArray();
                scratchCardNumbers = line.Split(" | ")[1].Split(" ").Where(x => x != "").ToArray();


                int rowSum = 0;
                int matchCount = 0;
                for (int i = 0; i < 10; i++)
                {
                    parsedWinningNumbers[i] = int.Parse(winningNumbers[i]);
                    for (int j = 0; j < 25; j++)
                    {
                        parsedScratchCardNumbers[j] = int.Parse(scratchCardNumbers[j]);
                        if (parsedWinningNumbers[i] == parsedScratchCardNumbers[j])
                        {
                            if (rowSum == 0)
                            {
                                rowSum = 1;
                            }
                            else
                            {
                                rowSum = rowSum * 2;
                            }
                            matchCount++;
                            break;
                        }
                    }
                }
                if (cardCopies[cardIndex] == 0)
                {
                    cardCopies[cardIndex] = 1;
                }
                else
                {
                    cardCopies[cardIndex]++;
                }
                for (int i = cardIndex + 1; i < cardIndex + 1 + matchCount && i < cardStackLength; i++)
                {
                    cardCopies[i] = cardCopies[i] + cardCopies[cardIndex];
                }

                rowSum = rowSum * cardCopies[cardIndex];
                sum += rowSum;
                cardIndex++;
            }
            Console.WriteLine("Part Two Result: " + cardCopies.Sum());
        }
    }
}