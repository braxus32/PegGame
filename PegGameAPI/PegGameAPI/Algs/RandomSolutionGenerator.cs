using PegGameAPI.Models;

namespace PegGameAPI.Algs
{
  public class RandomSolutionGenerator
  {
    private int initSlot;
    private int numRows;

    private int numPegs;
    private bool[] slotStates;
    private HashSet<int> viableEmpties;
    private List<int[]> validMoves;
    private List<int[]> moveList;

    public Solution Generate(int initSlot, int numRows)
    {
      this.initSlot = initSlot;
      this.numRows = numRows;

      this.numPegs = TriangleFunc(numRows);
      this.slotStates = new bool[this.numPegs];
      for (int i = 0; i < this.numPegs; ++i)
      {
        this.slotStates[i] = true;

      }
      this.slotStates[this.initSlot] = false;

      this.viableEmpties = new HashSet<int>(this.numPegs / 2); //Set capacity to predicted upper bound
      this.viableEmpties.Add(this.initSlot);

      this.validMoves = new List<int[]>((int)Math.Ceiling(this.numPegs * 0.75)); //List capacity to predicted upper bound

      this.moveList = new List<int[]>(this.numPegs); //List capacity to predicted upper bound

      do
      {
        foreach (int viable in this.viableEmpties)
        {
          Console.WriteLine("checking viable: " + viable);
          FindMoves(viable);
        }
        if (this.validMoves.Count > 0)
        {
          MakeMove();
        }
        else
        {
          this.viableEmpties.Clear();
        }
      }
      while (this.viableEmpties.Count != 0);

      return new Solution
      {
        InitSlot = this.initSlot,
        NumRows = this.numRows,
        NumMoves = this.moveList.Count,
        MoveSet = this.moveList
      };
    }

    private int TriangleFunc(int x)
    {
      return (x * (x + 1)) / 2;
    }

    private double InvTriangleFunc(int y)
    {
      return Math.Sqrt(2 * y + 0.25) - 0.5;
    }

    private int ApproxNumerator(double overallPos, int denom)
    {
      double dif = overallPos - denom + 1;
      return (int)Math.Round(dif * denom);
    }

    private void MakeMove()
    {
      int[] move = GetRandomMove();
      this.moveList.Add(move);

      foreach (int slotNum in move)
      {
        Console.WriteLine("Move part: " + slotNum);
        this.slotStates[slotNum] = !this.slotStates[slotNum];
      }
      this.viableEmpties.Add(move[0]);
      this.viableEmpties.Add(move[1]);
      this.viableEmpties.Remove(move[2]);
      CleanUp(move[2]);
      this.moveList.Clear();
    }

    private int[] GetRandomMove()
    {
      Random rand = new Random();
      return this.validMoves[rand.Next(this.validMoves.Count)];
    }

    private void FindMoves(int index)
    {
      double overallPos = InvTriangleFunc(index + 1); //Adding 1 important due to zero indexing
      int rowNum = (int)Math.Ceiling(overallPos); 
      int rowPos = ApproxNumerator(overallPos, rowNum);


      // Check if left side is clear
      if (rowPos > 2)
      {
        // Check upper left
        int nearUL = index - rowNum;
        int farUL = index - 2 * rowNum + 1;
        if (this.slotStates[nearUL] && this.slotStates[farUL])
        {
          this.validMoves.Add([farUL, nearUL, index]);
        }

        // Check left
        int nearL = index - 1;
        int farL = index - 2;
        if (this.slotStates[nearL] && this.slotStates[farL])
        {
          this.validMoves.Add([farL, nearL, index]);
        }
      }
      // Check if right side is clear
      if (rowPos < rowNum - 1)
      {
        // Check upper right
        int nearUR = index - rowNum + 1;
        int farUR = index - 2 * rowNum + 3;
        if (this.slotStates[nearUR] && this.slotStates[farUR])
        {
          this.validMoves.Add([farUR, nearUR, index]);
        }

        // Check right
        int nearR = index + 1;
        int farR = index + 2;
        if (this.slotStates[nearR] && this.slotStates[farR])
        {
          this.validMoves.Add([farR, nearR, index]);
        }
      }
      // Check if bottom is clear
      if (rowNum < this.numRows - 1)
      {
        // Check lower left
        int nearLL = index + rowNum;
        int farLL = index + 2 * rowNum + 1;
        if (this.slotStates[nearLL] && this.slotStates[farLL])
        {
          this.validMoves.Add([farLL, nearLL, index]);
        }

        // Check lower right
        int nearLR = index + rowNum + 1;
        int farLR = index + 2 * rowNum + 3;
        if (this.slotStates[nearLR] && this.slotStates[farLR])
        {
          this.validMoves.Add([farLR, nearLR, index]);
        }
      }
    }

    private void CleanUp(int index)
    {
      double overallPos = InvTriangleFunc(index + 1); //Adding 1 important due to zero indexing
      int rowNum = (int)Math.Ceiling(overallPos);
      int rowPos = ApproxNumerator(overallPos, rowNum);

      //int nearL = index - 1;
      int farL = index - 2;
      //int nearUL = index - rowNum;
      int farUL = index - 2 * rowNum + 1;
      //int nearUR = index - rowNum + 1;
      int farUR = index - 2 * rowNum + 3;
      //int nearR = index + 1;
      int farR = index + 2;
      //int nearLR = index + rowNum + 1;
      int farLR = index + 2 * rowNum + 3;
      //int nearLL = index + rowNum;
      int farLL = index + 2 * rowNum + 1;

      SlotContext nearL = new SlotContext(index - 1);
      SlotContext nearUL = new SlotContext(index - rowNum);
      SlotContext nearUR = new SlotContext(index - rowNum + 1);
      SlotContext nearR = new SlotContext(index + 1);
      SlotContext nearLR = new SlotContext(index + rowNum + 1);
      SlotContext nearLL = new SlotContext(index + rowNum);

      if (rowPos > 1)
      {
        nearL.context = this.slotStates[nearL.index] ? 1 : 0;
        if (this.slotStates[nearL.index] && rowPos > 2 && !this.slotStates[farL])
        {
          this.viableEmpties.Add(farL);
        }

        nearUL.context = this.slotStates[nearUL.index] ? 1 : 0;
        if (this.slotStates[nearUL.index] && rowPos > 2 && !this.slotStates[farUL])
        {
          this.viableEmpties.Add(farUL);
        }
      }

      if (rowPos < rowNum)
      {
        nearUR.context = this.slotStates[nearUR.index] ? 1 : 0;
        if (this.slotStates[nearUR.index] && rowPos < rowNum - 1 && !this.slotStates[farUR])
        {
          this.viableEmpties.Add(farUR);
        }

        nearR.context = this.slotStates[nearR.index] ? 1 : 0;
        if (this.slotStates[nearR.index] && rowPos < rowNum - 1 && !this.slotStates[farR])
        {
          this.viableEmpties.Add(farR);
        }
      }

      if (rowNum < this.numRows)
      {
        nearLR.context = this.slotStates[nearLR.index] ? 1 : 0;
        if (this.slotStates[nearLR.index] && rowNum < this.numRows - 1 && !this.slotStates[farLR])
        {
          this.viableEmpties.Add(farLR);
        }

        nearLL.context = this.slotStates[nearLL.index] ? 1 : 0;
        if (this.slotStates[nearLL.index] && rowNum < this.numRows - 1 && !this.slotStates[farLL])
        {
          this.viableEmpties.Add(farLL);
        }
      }

      if (nearL.context + nearR.context == 1)
      {
        this.viableEmpties.Add(nearL.context < nearR.context ? nearL.index : nearR.index);
      }
      if (nearUL.context + nearLR.context == 1)
      {
        this.viableEmpties.Add(nearUL.context < nearLR.context ? nearUL.index : nearLR.index);
      }
      if (nearLL.context + nearUR.context == 1)
      {
        this.viableEmpties.Add(nearLL.context < nearUR.context ? nearLL.index : nearUR.index);
      }
    }

    struct SlotContext
    {
      public int index;
      public int context = -1;

      public SlotContext(int i)
      {
        index = i;
      }
    }
  }
}


