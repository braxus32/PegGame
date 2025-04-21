using PegGameAPI.Algs;

namespace PegGameAPI.Tests
{
  [TestClass]
  public sealed class SolutionGeneratorTest
  {
    [TestMethod]
    public void RandomGeneratorNullTest()
    {
      var generator = new RandomSolutionGenerator();
      Assert.IsNotNull(generator);
    }
  }
}
