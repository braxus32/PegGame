using PegGameAPI.Models;
using PegGameAPI.Algs;

namespace PegGameAPI.Services;

public static class SolutionService
{
  static List<Solution> Solutions { get; }
  static RandomSolutionGenerator Generator = new RandomSolutionGenerator();
  static SolutionService()
  {
    Solutions = new List<Solution>();

    Solutions.Add(Generator.Generate(0, 5));
  }

  public static List<Solution> GetAll() => Solutions;

  public static List<int[]>? Get(int initSlot, int numRows)
  {
    return Solutions.FirstOrDefault(s => s.InitSlot == initSlot && s.NumRows == numRows).MoveSet;
  }

  //public static void Add
}
