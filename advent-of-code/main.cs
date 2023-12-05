using System.IO;
using System.Linq;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace program
{
    class Run
    {
        static void Main(string[] args)
        {
            Day3 day = new Day3();
            Stopwatch sw = new Stopwatch();


            /* sw.Start();
            day.PartOne();
            sw.Stop();
            Console.WriteLine("Part One Elapsed= {0}ms", sw.ElapsedMilliseconds);
            
            sw.Reset(); */

            sw.Start();
            day.PartTwo();
            sw.Stop();
            Console.WriteLine("Part Two Elapsed={0} ms", sw.ElapsedMilliseconds);
        }
    }
}