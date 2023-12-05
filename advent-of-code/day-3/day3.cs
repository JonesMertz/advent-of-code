using System.IO;
using System.Linq;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;

namespace program
{
    class Day3
    {
        public void PartOne()
        {
            String input = File.ReadAllText("../../../day-3/input.txt");
            int row = 0, column;
            int rowCount = 140;
            int columnCount = 140;
            string[,] schematic = new string[rowCount, columnCount];
            foreach (var inputRow in input.Split('\n'))
            {
                column = 0;
                foreach (var col in inputRow.Trim())
                {
                    schematic[row, column] = col.ToString();
                    column++;
                }
                row++;
            }
            int sum = 0;
            for (int i = 0; i < rowCount; i++)
            {
                for (int j = 0; j < columnCount; j++)
                {
                    if (schematic[i, j] == ".") // ignore dots
                    {
                        continue;
                    }
                    if (int.TryParse(schematic[i, j], out _))
                    {
                        bool isValidNumber = false;
                        string number = "";
                        while (j < columnCount && int.TryParse(schematic[i, j], out _))
                        {
                            string[] positionsToCheck = new string[8];
                            if (i > 0)
                            {
                                positionsToCheck[0] = schematic[i - 1, j]; // top
                                if (j > 0)
                                {
                                    positionsToCheck[1] = schematic[i - 1, j - 1]; // top left
                                }
                                if (j < columnCount - 1)
                                {
                                    positionsToCheck[2] = schematic[i - 1, j + 1]; // top right
                                }
                            }
                            if (i < rowCount - 1)
                            {
                                positionsToCheck[3] = schematic[i + 1, j]; // bottom
                                if (j > 0)
                                {
                                    positionsToCheck[4] = schematic[i + 1, j - 1]; // bottom left
                                }
                                if (j < columnCount - 1)
                                {
                                    positionsToCheck[5] = schematic[i + 1, j + 1]; // bottom right
                                }
                            }
                            if (j > 0)
                            {
                                positionsToCheck[6] = schematic[i, j - 1]; // left
                            }
                            if (j < columnCount - 1)
                            {
                                positionsToCheck[7] = schematic[i, j + 1]; // right
                            }

                            number += schematic[i, j]; // add current number to number string
                            if (!isValidNumber)
                            {
                                foreach (string position in positionsToCheck)
                                {
                                    if (position != null && position != "." && int.TryParse(position, out _) != true)
                                    {
                                        isValidNumber = true;
                                    }
                                }
                            }
                            j++;
                        }
                        if (isValidNumber)
                        {
                            sum += int.Parse(number);
                        }
                    }
                }
            }
            Console.WriteLine("Sum: " + sum);
        }
        public void PartTwo()
        {
            String input = File.ReadAllText("../../../day-3/input.txt");
            int row = 0, column;
            int rowCount = 140;
            int columnCount = 140;
            string[,] schematic = new string[rowCount, columnCount];
            Dictionary<string, List<int>> gearPositions = new Dictionary<string, List<int>>();
            foreach (var inputRow in input.Split('\n'))
            {
                column = 0;
                foreach (var col in inputRow.Trim())
                {
                    schematic[row, column] = col.ToString();
                    column++;
                }
                row++;
            }
            int sum = 0;
            for (int i = 0; i < rowCount; i++)
            {
                for (int j = 0; j < columnCount; j++)
                {
                    if (schematic[i, j] == ".") // ignore dots
                    {
                        continue;
                    }
                    if (int.TryParse(schematic[i, j], out _))
                    {
                        bool isValidNumber = false;
                        List<int[]> gears = new List<int[]>();
                        string number = "";
                        while (j < columnCount && int.TryParse(schematic[i, j], out _))
                        {
                            string[] positionsToCheck = new string[8];
                            if (i > 0)
                            {
                                positionsToCheck[0] = schematic[i - 1, j]; // top
                                if (j > 0)
                                {
                                    positionsToCheck[1] = schematic[i - 1, j - 1]; // top left
                                }
                                if (j < columnCount - 1)
                                {
                                    positionsToCheck[2] = schematic[i - 1, j + 1]; // top right
                                }
                            }
                            if (i < rowCount - 1)
                            {
                                positionsToCheck[3] = schematic[i + 1, j]; // bottom
                                if (j > 0)
                                {
                                    positionsToCheck[4] = schematic[i + 1, j - 1]; // bottom left
                                }
                                if (j < columnCount - 1)
                                {
                                    positionsToCheck[5] = schematic[i + 1, j + 1]; // bottom right
                                }
                            }
                            if (j > 0)
                            {
                                positionsToCheck[6] = schematic[i, j - 1]; // left
                            }
                            if (j < columnCount - 1)
                            {
                                positionsToCheck[7] = schematic[i, j + 1]; // right
                            }

                            number += schematic[i, j]; // add current number to number string
                            if (!isValidNumber)
                            {
                                int positionIndex = 0;
                                foreach (string position in positionsToCheck)
                                {
                                    bool numberIsNextToGear = position == "*";
                                    if (numberIsNextToGear)
                                    {
                                        isValidNumber = true;
                                        gears.Add(indexToPosition(positionIndex, i, j));
                                    }
                                    positionIndex++;
                                }
                            }
                            j++;
                        }
                        if (isValidNumber)
                        {
                            foreach (int[] gear in gears)
                            {
                                if (gearPositions.ContainsKey(gear[0] + "," + gear[1]))
                                {
                                    gearPositions[gear[0] + "," + gear[1]].Add(int.Parse(number));
                                }
                                else
                                {
                                    gearPositions[gear[0] + "," + gear[1]] = [int.Parse(number)];
                                }
                            }
                        }
                    }
                }
            }
            Console.WriteLine("Sum: " + sum);
        }

        private static int[] indexToPosition(int index, int i, int j)
        {
            switch (index)
            {
                case 0:
                    return [i - 1, j];
                case 1:
                    return [i - 1, j - 1];
                case 2:
                    return [i - 1, j + 1];
                case 3:
                    return [i + 1, j];
                case 4:
                    return [i + 1, j - 1];
                case 5:
                    return [i + 1, j + 1];
                case 6:
                    return [i, j - 1];
                case 7:
                    return [i, j + 1];
                default:
                    return [i, j];
            }
        }
    }
}