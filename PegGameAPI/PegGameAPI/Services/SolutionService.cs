using PegGameAPI.Models;

namespace PegGameAPI.Services;

public static class SolutionService
{
  static List<Solution> Solutions { get; }
  static SolutionService()
  {
    Solutions = new List<Solution>
    {
      new Solution {
        InitSlot = 0,
        NumRows = 5,
        NumMoves = 13,
        MoveSet = [
          [3, 1, 0], [5, 4, 3], [0, 2, 5], [6, 3, 1], [12, 7, 3], [1, 3, 6], [9, 8, 7],
          [6, 7, 8], [14, 13, 12], [11, 12, 13], [5, 8, 12], [13, 12, 11], [10, 11, 12]
        ]}
    };
  }

  public static List<Solution> GetAll() => Solutions;

  public static List<int[]>? Get(int initSlot, int numRows)
  {
    return Solutions.FirstOrDefault(s => s.InitSlot == initSlot && s.NumRows == numRows).MoveSet;
  }

  //public static void Add
}
