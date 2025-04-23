using PegGameAPI.Algs;

namespace PegGameAPI.Tests
{
  [TestClass]
  public sealed class SolutionGeneratorTest
  {
    RandomSolutionGenerator Generator = new RandomSolutionGenerator();

    [TestMethod]
    public void RandomGeneratorNullTest()
    {
      Assert.IsNotNull(Generator);
    }

  }
}
